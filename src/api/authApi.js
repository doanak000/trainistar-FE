import axiosClient from './axiosClient'

const prefix = '/auth'

export const authApi = {
  login(username, password) {
    const url = `${prefix}`
    return axiosClient.post(url, {
      username,
      password
    })
  },

  getMe() {
    const url = `${prefix}/me`
    return axiosClient.get(url)
  }
}
