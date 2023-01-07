import { Button, Drawer, Form, InputNumber, Select } from 'antd'
import React, { useEffect } from 'react'
import { courseApi } from '../../api'

import { useFetchData } from '../../hooks'

export const DrawerUpdateMark = ({ courseId, isOpen, onClose, onSubmit }) => {
  const studentsState = useFetchData(() => courseApi.getCourseStudents({ idCourse: courseId }), false)

  useEffect(() => {
    studentsState.fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])

  console.log(studentsState.data)

  return (
    <Drawer title='Update Mark' placement='right' onClose={onClose} open={isOpen}>
      <Form
        name='update-mark'
        layout='vertical'
        onFinish={onSubmit}
      >
        <Form.Item label='Student' name='studentId'>
          <Select
            options={studentsState.data.map((item) => ({
              label: [item.firstName, item.lastName].join(' '),
              value: item.idUser
            }))}
            placeholder='Select student'
          />
        </Form.Item>

        <Form.Item
          label='Mark'
          name='mark'
        >
          <InputNumber placeholder='Mark' min={0} max={10} />
        </Form.Item>

        <Button type='primary' htmlType='submit'>
          Save
        </Button>
      </Form>
    </Drawer>
  )
}
