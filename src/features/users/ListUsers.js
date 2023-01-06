import { Button, Card, Drawer, Form, Input, InputNumber, Modal, Space, Table } from 'antd'
import React, { useState } from 'react'
import { userApi } from '../../api'

const checkTypeStudent = (mark) => {
  if (mark >= 8.5) return 'Good'
  if (mark >= 7) return 'Rather'
  if (mark >= 5.5) return 'Medium'
  if (mark >= 4) return 'Bad'
  return 'Jitney'
}

const ListUsers = ({
  listUsers,
  deleteUser,
  updateUser
}) => {
  const [open, setOpen] = useState(false)
  const [currentUserModal, setCurrentUserModal] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const showDrawer = (_) => {
    setOpen(true)
    form.setFieldsValue(
      { ..._ }
    )
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

  const showModal = async (record) => {
    const { data } = await userApi.courseHistory(record.idUser)
    setCurrentUserModal(data)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Last Name',
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => showDrawer(_)}>Edit</Button>
          <Button
            onClick={() => {
              deleteUser(record)
            }}
          >
            Delete
          </Button>
          {record.typeUser === 1 && <Button onClick={() => showModal(record)}> Detail Student </Button>}
        </Space>
      )
    }
  ]

  return (
    <>
      <Table columns={columns} dataSource={listUsers} bordered />
      <Drawer
        title='Update Users'
        placement='right'
        onClose={onClose}
        open={open}
      >
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
            label='User Name'
            name='userName'
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='First Name'
            name='firstName'
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Last Name'
            name='lastName'
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Phone Number'
            name='phoneNumber'
          >
            <Input type='number' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label='Type User (1: Student, 2: Teacher)'
            name='typeUser'
          >
            <InputNumber max={2} min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal title='Student Info' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {currentUserModal?.map((item, index) => {
          return (<div style={{ paddingBottom: '10px' }} key={index}><Card title={item.nameCourse} >
            <p>Point: {item.mark}</p>
            <p>Type Student: {checkTypeStudent(item.mark)}</p>
          </Card></div>)
        })
        }
      </Modal>
    </>
  )
}
export default ListUsers
