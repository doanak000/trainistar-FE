import React, { useEffect, useState } from 'react'
import Login from '../features/auth/Login'
import { sampleApi } from '../api'
import { Spin } from 'antd'

const Courses = ({ courses = [] }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          {JSON.stringify(course)}
        </div>
      ))}
    </div>
  )
}

const HomePage = () => {
  const [courses, setCourses] = useState(null)
  const [isFetching, setIsFetching] = useState(true) // Init Loading State

  const fetchData = async () => {
    try {
      const { success, data } = await sampleApi.getCourses()

      if (!success) {
        throw new Error(data)
      }

      // Handle Success
      console.log('Success', data)
      setCourses(data)

    } catch (error) {
      // Handle Error
      console.error('Error', error.message)
      setCourses([])
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>HomePage</h1>
      <div>
        {isFetching ? <Spin /> : <Courses courses={courses} />}
      </div>
    </div>
  )
}

export default HomePage
