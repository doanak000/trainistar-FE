import { Button, Drawer, Form, Input, Space, Table } from 'antd'
import React, { useState } from 'react'


const Students = () => {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    console.log('----Show Drawer Log----')
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
    const onFinish = (values) => {
    console.log('Success:', values)
        setOpen(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
        setOpen(false)
  }

  const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'First name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'List Enroll Courses',
    dataIndex: 'listCourse',
    key: 'listCourse',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'List Skills',
    dataIndex: 'listSkill',
    key: 'listSkill',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'List Certificates',
    dataIndex: 'listCertificate',
    key: 'listCertificate',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <Button onClick={showDrawer}>Edit</Button>
        <Button>Delete</Button>
        <a>Xem đánh giá</a>
      </Space>
    )
  }
]

  const data = [
  {
    key: '1',
    nameCourse: 'ABC',
    teacher: 'doan',
    description: 'khoa hoc ve ... '
  },
  {
    key: '2',
    nameCourse: 'ABC',
    teacher: 'doan',
    description: 'khoa hoc ve ... '
  }, {
    key: '3',
    nameCourse: 'ABC',
    teacher: 'doan',
    description: 'khoa hoc ve ... '
  }, {
    key: '4',
    nameCourse: 'ABC',
    teacher: 'doan',
    description: 'khoa hoc ve ... '
  }, {
    key: '5',
    name: 'ABC',
    teacher: 'doan',
    description: 'khoa hoc ve ... '
  }
]

return (
  <>
       <Table columns={columns} dataSource={data} />
        <Drawer title='Basic Drawer' placement='right' onClose={onClose} open={open}>
           <Form
              name='basic'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item
                label='Course'
                name='nameCourse'
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Teacher'
                name='teacher'
              >
                <Input />
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
  </>
)

}
 export default Students
 
