import { notification } from 'antd'
import { useState } from 'react'
import { courseApi } from '../../api'

export const useCoursesData = () => {
  const [courses, setCourses] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const getCourses = async () => {
    try {
      setIsFetching(true)
      const { success, data } = await courseApi.getListCourseApi()
      if (!success) {
        throw new Error('Failed to get courses')
      }
      setCourses(data)
    } catch (error) {
      notification.error({
        message: 'Failed to get courses',
        description: error.message
      })
      setCourses([])
    } finally {
      setIsFetching(false)
    }
  }

  return {
    courses,
    isFetching,
    getCourses
  }
}
