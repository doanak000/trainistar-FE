import axiosClient from './axiosClient'

const prefix = '/api/course'

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
  },
  getTotalStudentByTime(data) {
    const url = `/api/course_student/totalstudents/${data}`
    return axiosClient.get(url)
  },

  search(keyword) {
    const url = `${prefix}/searchname/${keyword}`
    return axiosClient.get(url)
  },

  getCourseById(courseId) {
    const url = `${prefix}/searchid/${courseId}`
    return axiosClient.get(url)
  },

  joinCourse({ courseId, studentId }) {
    const url = '/api/course_student/create'
    return axiosClient.post(url, { idCourse: courseId, idStudent: studentId })
  }
}
