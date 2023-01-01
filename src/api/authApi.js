import axiosClient from './axiosClient'

const prefix = '/api/user'

export const authApi = {
  login(username, password) {
    const url = `${prefix}/auth`
    return axiosClient.post(url, {
      username,
      password
    })
  }
}
