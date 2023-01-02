import axiosClient from './axiosClient'

export const userApi = {
  getAllUserApi() {
    const url = '/api/user/all'
    return axiosClient.get(url)
  },
  deleteUser(userName) {
    const url = `/api/user/${userName}`
    return axiosClient.delete(url)
  },
  createUser(data) {
    const url = '/api/user/create'
    return axiosClient.post(url,{ data })
  },
  courseHistory(id) {
    const url = `/api/course_student/history/${id}`
    return axiosClient.get(url)  
  }

}
