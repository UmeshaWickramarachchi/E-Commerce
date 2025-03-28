import axios from "axios"
import apiConfig from "./apiConfig"
import * as constant from "../configs/constant"
import Cookies from "js-cookie"
import swal from "sweetalert"

const instance = axios
let isRefresh = false

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : 0
    if (status === 401) {
      if (isRefresh) {
        swal({
          title: "Session expired. Please login again",
          closeOnClickOutside: false,
          buttons: {
            dangerMode: {
              text: "Okay",
              value: "action",
              className: "okay-btn"
            }
          }
        }).then((value) => {
          switch (value) {
            case "action":
              Cookies.remove(constant.ACCESS_TOKEN)
              Cookies.remove(constant.REFRESH_TOKEN)
              localStorage.removeItem(constant.USER_DATA)
              window.location = `${constant.BASE_ROUTE_PATH}/login`
              break
            default:
          }
        })
        return
      }

      isRefresh = true
      const URL = `${apiConfig.serverUrl}/${apiConfig.basePath}/auth/refreshToken`
      const config = {
        headers: {
          Authorization: `Bearer ${Cookies.get(constant.REFRESH_TOKEN)}`,
          isRefreshToken: true
        }
      }

      let isAccessTokenRefreshed = false
      await axios
        .post(`${URL}`, {}, config)
        .then(async (res) => {
          await Cookies.set(constant.ACCESS_TOKEN, res.data.result)
          Cookies.set(constant.REFRESH_TOKEN, res.data.result)
          isAccessTokenRefreshed = true
        })
        .catch((err) => {
          swal({
            title: "Session expired. Please login again",
            closeOnClickOutside: false,
            buttons: {
              dangerMode: {
                text: "Okay",
                value: "action",
                className: "okay-btn"
              }
            }
          }).then((value) => {
            switch (value) {
              case "action":
                /*eslint-disable */
                console.log("ererer,", err)
                Cookies.remove(constant.ACCESS_TOKEN)
                Cookies.remove(constant.REFRESH_TOKEN)
                localStorage.removeItem(constant.USER_DATA)
                window.location = `${constant.BASE_ROUTE_PATH}/login`
                /*eslint-enable */
                break
              default:
            }
          })
        })
      if (isAccessTokenRefreshed) {
        error.config.headers["Authorization"] = `Bearer ${Cookies.get(
          constant.ACCESS_TOKEN
        )}`
        return axios.request(error.config)
      }
    } else {
      return Promise.reject(error)
    }
  }
)
export default instance
