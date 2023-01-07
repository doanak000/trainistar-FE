import { Button, Col, Drawer, Form, Row, Select } from 'antd'
import React, { useEffect } from 'react'
import { useCoursesData } from '../../listcourses/hook'

// create form assign skill with Drawer of ant design (vertical layout):
// idCourse (Select)

export const FormAssignSkill = ({ onClose, visible, isSubmitting, onSubmit }) => {
  const { courses, getCourses } = useCoursesData()

  useEffect(() => {
    getCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Drawer title='Assign Skill' width={720} onClose={onClose} open={visible} bodyStyle={{ paddingBottom: 80 }} closable>
      <Form layout='vertical' onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='idCourse'
              label='Course'
              rules={[{ required: true, message: 'Please select a course' }]}
            >
              <Select placeholder='Please select a course' options={courses.map(course => ({ label: course.nameCourse, value: course.idCourse }))} />
            </Form.Item>
          </Col>
        </Row>

        <Button type='primary' htmlType='submit' loading={isSubmitting}>Assign</Button>
      </Form>
    </Drawer>
  )
}
