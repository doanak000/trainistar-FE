import axiosClient from './axiosClient'
import axiosClientJava from './axiosClientJava'

export const sampleApi = {
  getActivity() {
    const url = '/activity'
    return axiosClient.get(url)
  },
  getCourses() {
    const url = '/courses'
    return axiosClientJava.get(url)
  }
}


export const userApi = {
  getAllUserApi() {
    const url = '/api/user/all'
    return axiosClient.get(url)
  }
}
