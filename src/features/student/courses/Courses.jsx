import { Col, Row, Spin } from 'antd'
import React from 'react'
import { courseApi } from '../../../api'
import { useFetchData } from '../../../hooks'
import { CourseItem } from './course-item'
import { PageTitle } from '../../../components/page-title'

export const StudentCourses = () => {
  const { data: courses, isFetching } = useFetchData(courseApi.getListCourseApi)

  if (isFetching) {
    return <div><Spin /></div>
  }

  return (
    <div>
      <PageTitle title='Courses' />

      <Row gutter={[16, 16]}>
        {courses.map((course) => {
          return (
            <Col span={8} md={24} lg={12} xl={8} key={course.idCourse}>
              <CourseItem course={course} />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
