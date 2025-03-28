import * as constant from "../../../configs/constant"
import apiConfig from "../../../services/apiConfig"

// ** Auth Endpoints
export default {
  baseURL: apiConfig.serverUrl,
  loginEndpoint: "/auth/signIn",
  refreshEndpoint: "/auth/refreshToken",
  logoutEndpoint: "/jwt/logout",
  tokenType: "Bearer",
  storageTokenKeyName: constant.ACCESS_TOKEN,
  storageRefreshTokenKeyName: constant.REFRESH_TOKEN
}
