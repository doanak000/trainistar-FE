import axiosClient from './axiosClient'

const prefix = '/auth'

const authUrl = {
  Admin: `${prefix}/admin`,
  Manager: `${prefix}/manager`,
  Trainer: `${prefix}/trainer-student`,
  Student: `${prefix}/trainer-student`
}

export const authApi = {
  login(role, username, password) {
    const url = authUrl[role]
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
