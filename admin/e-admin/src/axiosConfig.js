import axios from "axios"
import apiConfig from "./apiConfig"
import * as constant from "../configs/constant"
import Cookies from "js-cookie"
import swal from "sweetalert"
// import swal from "sweetalert"
// let isRefresh = false
const instance = axios

// for use renew a token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : 0
    if (status === 401) {
      // if (isRefresh) {
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
              Cookies.remove("ACCESS_TOKEN")
              // localStorage.removeItem(constant.LOCAL_STORAGE_KEY)
              window.location = "/login"
              break
            default:
          }
        })
        return
      }
      isRefresh = true
      const URL = "http://103.125.216.56:8096/api/v1/auth/refreshToken"
      const config = {
        headers: {
          Authorization: `Bearer ${Cookies.get("ACCESS_TOKEN")}`,
          isRefreshToken: true
        }
      }

      let isAccessTokenRefreshed = false
      await axios
        .post(`${URL}`, {}, config)
        .then(async (res) => {
          await Cookies.set("ACCESS_TOKEN", res.data.result)
          isAccessTokenRefreshed = true
        })
        .catch((err) => {
          /*eslint-disable */
          console.log("ererer,", err)
          // Cookies.remove(constant.ACCESS_TOKEN)
          // localStorage.removeItem(constant.LOCAL_STORAGE_KEY)
          window.location = "/login"
          /*eslint-enable */
        })
      if (isAccessTokenRefreshed) {
        error.config.headers["Authorization"] = `Bearer ${Cookies.get(
        "ACCESS_TOKEN"
        )}`
        return axios.request(error.config)
      }
    // } else {
    //   return Promise.reject(error)
    // }
  }
)
export default instance
