import { Button, Drawer, Form, Input, Space, Table } from 'antd'
import React, { useState } from 'react'
// import { FormStudent, TableStudent } from './Students.style'
import './students.css'

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
    render: (text) => <p>{text}</p>
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
    render: (text) => <p>{text}</p>
  },
  {
    title: 'First name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (text) => <p>{text}</p>
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (text) => <p>{text}</p>
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <p>{text}</p>
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: (text) => <p>{text}</p>
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: (text) => <p>{text}</p>
  },
  {
    title: 'List courses',
    dataIndex: 'listCourse',
    key: 'listCourse',
    render: (text) => <p>{text}</p>
  },
  {
    title: 'List skills',
    dataIndex: 'listSkill',
    key: 'listSkill',
    render: (text) => <p>{text}</p>
  },
  // {
  //   title: 'List certificates',
  //   dataIndex: 'listCertificate',
  //   key: 'listCertificate',
  //   render: (text) => <p>{text}</p>
  // },
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
    username: 'minhvo',
    password: 'abc123',
    firstName: 'Minh',
    lastName: 'Vo',
    email: 'ducminh12320@gmail.com',
    phoneNumber: '07979999281',
    gender: 'male',
    listCourse: '',
    listSkill: ''
    // listCertificate: ''
  },
  {
    key: '2',
    username: 'dainguyen',
    password: 'abc123',
    firstName: 'Dai',
    lastName: 'Nguyen',
    email: 'ncdai3651408@icloud.com',
    phoneNumber: '0777888148',
    gender: 'male',
    listCourse: '',
    listSkill: ''
    // listCertificate: ''
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
                label='Username'
                name='username'
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='First name'
                name='firstName'
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Last name'
                name='lastName'
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Email'
                name='email'
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Phone number'
                name='phoneNumber'
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Gender'
                name='gender'
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='List courses'
                name='listCourse'
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='List skills'
                name='listSkill'
              >
                <Input />
              </Form.Item>

              {/* <Form.Item
                label='List certificates'
                name='listCertificate'
              >
                <Input />
              </Form.Item> */}

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
 
