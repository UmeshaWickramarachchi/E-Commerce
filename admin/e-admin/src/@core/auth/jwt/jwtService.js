import axios from "axios"
import jwtDefaultConfig from "./jwtDefaultConfig"
import Cookies from "js-cookie"

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Create an Axios instance with the base URL
    this.axiosInstance = axios.create({
      baseURL: this.jwtConfig.baseURL
    })

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = this.getToken()

        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { config, response } = error
        const originalRequest = config

        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then((r) => {
              this.isAlreadyFetchingAccessToken = false

              // Update accessToken in storage
              this.setToken(r.data.accessToken)
              this.setRefreshToken(r.data.refreshToken)

              this.onAccessTokenFetched(r.data.accessToken)
            })
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axiosInstance(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers.forEach((callback) => callback(accessToken))
    this.subscribers = []
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return Cookies.get(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return Cookies.get(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    Cookies.set(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    Cookies.set(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return this.axiosInstance.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return this.axiosInstance.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return this.axiosInstance.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }
}
