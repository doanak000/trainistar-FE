import { Button, Col, Row } from 'antd'
import React from 'react'
import { courseApi } from '../../../api'
import { useFetchData } from '../../../hooks'
import { CourseItem } from './course-item'
import { PageTitle } from '../../../components/page-title'
import { LoadingFullscreen } from '../../../components/loading-fullscreen'

export const StudentCourses = () => {
  const { data: courses, isFetching } = useFetchData(courseApi.getListCourseApi)

  if (isFetching) {
    return <LoadingFullscreen />
  }

  return (
    <div>
      <PageTitle title='Courses' renderRight={() => (
        <Button type='primary'>My Courses</Button>
      )} />

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
