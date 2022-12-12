import axiosClient from './axiosClient'

export const authApi = {
  login(username, password) {
    const url = '/login'
    return axiosClient.post(url, {
      username,
      password
    })
  }
}
