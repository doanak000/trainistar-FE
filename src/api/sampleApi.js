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

export const courseApi = {
  getListCourseApi() {
    const url = '/api/course/all'
    return axiosClient.get(url)
  },
  deleteCourseById(id) {
    const url = `/api/course/deletecourse/${id}`
    return axiosClient.delete(url)
  },
  updateCourseById(id, data) {
    const url = `/api/course/updatecourse/${id}`
    return axiosClient.put(url, { data })
  },
  createCourse(data) {
    const url = '/api/course/createcourse'
    return axiosClient.post(url, { data })
  }
}
export const userApi = {
  getAllUserApi() {
    const url = '/api/user/all'
    return axiosClient.get(url)
  }
}
