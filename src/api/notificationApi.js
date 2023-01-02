import axiosClient from './axiosClient'

export const notificationApi = {
  getAllNotificationApi() {
    const url = '/api/noti/all'
    return axiosClient.get(url)
  },
  createNotification (data) {
    const url = '/api/noti/create'
    return axiosClient.post(url,{ data })
  }
}
