import { Button, Drawer, Form, Input, Radio, Select, Space, Table } from 'antd'
import React, { useState } from 'react'


const dataTimeRender = (time) => {
  if (time === 'month') return 'Month'
  if (time === 'year') return 'Years'
  if (time === 'quarter') return 'Quarters'
  return 'Month'
}

const ListCourses = ({ listCourses, deleteCourse, updateCourseById, optionTeacher, fetchTotalStudentByTime, listManageCourses }) => {
  const [open, setOpen] = useState(false)
  const [currentCourseDrawer, setCurrentCouseDrawer] = useState(null)
  const [typeManage, setTypeManage] = useState('month')
  const [form] = Form.useForm()
  const showDrawer = (_) => {
    setCurrentCouseDrawer(_)
    setOpen(true)
    form.setFieldsValue(
      { ..._ }
    )
  }
  const onClose = () => {
    setOpen(false)
  }
  const onFinish = (values) => {
    updateCourseById(currentCourseDrawer?.idCourse, values)
    console.log('Success:', values)
    setOpen(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    setOpen(false)
  }

  const handleChangeTypeManage = (e) => {
    setTypeManage(e.target.value)
    fetchTotalStudentByTime(e.target.value)
  }

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'nameCourse',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Teacher',
      dataIndex: 'teacherName',
      key: 'teacher',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => showDrawer(_)}>Edit</Button>
          <Button onClick={() => { deleteCourse(record) }}>Delete</Button>
        </Space>
      )
    }
  ]
  const columnsManage = [
    {
      title: 'Course Name',
      dataIndex: 'nameCourse',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Total Students',
      dataIndex: 'TotalStudents',
      key: 'TotalStudents',
      render: (text) => <a>{text}</a>
    },
    {
      title: dataTimeRender(typeManage),
      dataIndex: dataTimeRender(typeManage),
      key: dataTimeRender(typeManage),
      render: (text) => <a>{text}</a>
    }
  ]

  return (
    <React.Fragment>
      <div className='space-y-4'>
        <Table bordered columns={columns} dataSource={listCourses}></Table>

        <Radio.Group value={typeManage} onChange={handleChangeTypeManage}>
          <Radio.Button value='month'>Month</Radio.Button>
          <Radio.Button value='quarter'>Quarter</Radio.Button>
          <Radio.Button value='year'>Year</Radio.Button>
        </Radio.Group>

        <Table bordered columns={columnsManage} dataSource={listManageCourses}></Table>
      </div>

      <Drawer title='Update Courses' placement='right' onClose={onClose} open={open}>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          form={form}
        >
          <Form.Item
            label='Course Name'
            name='nameCourse'
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Teacher'
            name='idTeacher'
          >
            <Select options={optionTeacher} />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </React.Fragment>
  )

}
export default ListCourses

