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
  },

  getFiles({ courseId }) {
    const url = `/api/importedfile/${courseId}`
    return axiosClient.get(url)
  },

  createFile({ courseId, link }) {
    const url = '/api/importedfile/create'
    return axiosClient.post(url, { idCourse: courseId, link })
  },

  getSkills() {
    const url = '/api/skill/all'
    return axiosClient.get(url)
  },

  createSkill({ nameSkill, level, idManager }) {
    const url = '/api/skill/create'
    return axiosClient.post(url, { name, level, idManager })
  },

  assignSkill({ idSkill, idCourse }) {
    const url = '/api/course_skill/create'
    return axiosClient.post(url, { idSkill, idCourse })
  },

  getCourseHistories({ idStudent }) {
    const url = `/api/course_student/history/${idStudent}`
    return axiosClient.get(url)
  },

  updateMark({ idStudent, idCourse, mark }) {
    const url = `/api/course_student/mark/${idStudent}/${idCourse}`
    return axiosClient.put(url, { mark })
  },

  getCertificates({ idStudent }) {
    const url = `/api/student_certificate/get/${idStudent}`
    return axiosClient.get(url)
  },

  getCourseStudents({ idCourse }) {
    const url = `/api/user/student/${idCourse}`
    return axiosClient.get(url)
  }
}
