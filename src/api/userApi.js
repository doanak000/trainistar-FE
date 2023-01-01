import axiosClient from './axiosClient'

export const userApi = {
  getAllUserApi() {
    const url = '/api/user/all'
    return axiosClient.get(url)
  }
}
