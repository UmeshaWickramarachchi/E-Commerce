import ApiService from "./apiService"

export async function getAllAdvertisement() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `admin/allAdvertisement`
  apiObject.body = null
  apiObject.notGroup = true
  return await ApiService.callApi(apiObject)
}

export async function getAllAdvertisementLayouts() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `advertisement/layouts`
  apiObject.body = null
  apiObject.notGroup = true
  return await ApiService.callApi(apiObject)
}

export async function saveAdvertisement(formatData) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = `upload,${formatData}`
  apiObject.body = null
  apiObject.notGroup = true
  return await ApiService.callApi(apiObject)
}

export async function updateAdvertisementExpireDate(obj) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = `admin/advertisement/updateExpireDate`
  apiObject.body = obj
  apiObject.notGroup = true
  return await ApiService.callApi(apiObject)
}

export async function deActiveteAdvertisment(obj) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = `admin/advertisement/deactivateAndActive`
  apiObject.body = obj
  apiObject.notGroup = true
  return await ApiService.callApi(apiObject)
}

