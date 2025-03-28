// import axios from "./axiosConfig"
// import apiConfig from "./apiConfig"
// import Cookies from "cookies-js"
// import * as commonFunc from "../utility/commonFunc"

// async function callApi(apiObject) {
//     console.log("api object", apiObject)

//     let body = {}
//     const method = apiObject.method ? apiObject.method.toLowerCase() : 'get'

//     if (method === 'post' || method === 'put' || method === 'patch') {
//         body = apiObject.body ? apiObject.body : {}
//     }

//     const headers = {
//         'Content-Type': apiObject.urlencoded ? 'application/x-www-form-urlencoded' : 'application/json'
//     }

//     if (apiObject.authentication) {
//         headers.Authorization = `Bearer ${Cookies.get("ACCESS_TOKEN")}`
//     }

//     const serverUrl = apiConfig.serverUrl
//     let basePath = apiConfig.basePath

//     if (apiObject.basePath) {
//         basePath = apiObject.basePath
//     }

//     const url = `${serverUrl}/${basePath}/${apiObject.endpoint}`
//     console.log('url : ', url)
//     let result

//     console.log('headers', headers)

//     const renewTokenHandler = async (apiObject) => {
//         let result
//         const URL = `http://103.125.216.56:8096/api/v1/auth/refreshToken`
//         console.log(URL)

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${Cookies.get("ACCESS_TOKEN")}`,
//                 isRefreshToken: true
//             }
//         } 

//         try {
//             const response = await axios.post(URL, { refreshToken: Cookies.get('REFRESH_TOKEN') }, config)

//             if (response.data.access_token) {
//                 Cookies.set('ACCESS_TOKEN', response.data.access_token)
//                 Cookies.set('REFRESH_TOKEN', response.data.refresh_token)
//                 result = await callApi(apiObject)
//             } else {
//                 result = {
//                     success: false,
//                     status: 2,
//                     message: 'Token renewal failed',
//                     data: null
//                 }
//             }
//         } catch (error) {
//             console.error('Error during token renewal:', error)
//             result = {
//                 success: false,
//                 status: 2,
//                 message: 'An unexpected error occurred during token renewal',
//                 data: null
//             }
//         }

//         return result
//     }

//     await axios[method](url, method !== 'get' && method !== 'delete' ? body : { headers }, { headers }).then(async response => {
//         result = {
//             ...response.data,
//             desc: response.data.desc ? response.data.desc : response.data.result,
//             status: response && response.status ? response.status : 0
//         }
//     }).catch(async error => {
//         if (!error.response) {
//             result = {
//                 success: false,
//                 status: 2,
//                 message: 'Your connection was interrupted',
//                 data: null
//             }
//         } else if (error.response.status === 401) {
//             if (apiObject.type === 'RENEW_TOKEN') {
//                 result = {
//                     success: false,
//                     status: 2,
//                     message: 'Your session expired! Please login again..',
//                     data: null
//                 }
//             } else if (apiObject.type === 'AUTH') {
//                 result = {
//                     success: false,
//                     status: 0,
//                     message: error.response.data.message,
//                     data: null
//                 }
//             } else {
//                 result = await renewTokenHandler(apiObject)
//             }
//         } else if (error.response.status === 403) {
//             result = {
//                 success: false,
//                 status: 2,
//                 message: 'Access is denied.',
//                 data: null
//             }
//         } else if (error.response.status === 417) {
//             result = {
//                 success: false,
//                 status: 2,
//                 message: 'Oops! Something went wrong.',
//                 data: null
//             }
//         } else if (error.response.data !== undefined) {
//             result = {
//                 success: false,
//                 status: 0,
//                 message: error.response.data.result ? error.response.data.result : 'Sorry, something went wrong',
//                 data: null
//             }
//         } else {
//             result = {
//                 success: false,
//                 status: 2,
//                 message: 'Sorry, something went wrong.',
//                 data: null
//             }
//         }
//     })

//     return result
// }

// export default { callApi }
