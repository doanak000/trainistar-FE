import React, { useState } from 'react'
import { Button, Card, Drawer, Form, Input, Modal, Select, Space, Table, Tag } from 'antd'
import { userApi } from '../../api'

const checkTypeStudent = (mark)=> {
  if (mark >= 8.5) return 'Good'
  if (mark >= 7) return 'Rather' 
  if (mark >=5.5) return 'Medium'
  if (mark >=4) return 'Bad'
  return 'Jitney'
}
const ListUsers = ({
  listUsers,
  deleteUser,
  updateUser
}) => {
  const [open, setOpen] = useState(false)
  const [currentUserDrawer, setCurrentUserDrawer] = useState(null)
  const [currentUserModal, setCurrentUserModal] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showDrawer = (record) => {
    setCurrentUserDrawer(record)
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onFinish = (values) => {
    // updateUser(currentUserDrawer?.idUser, values)
    console.log('Success:', values)
    setOpen(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    setOpen(false)
  }

  const showModal = async (record) => {
    const { success, data } = await userApi.courseHistory(record.idUser)
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
          <Button onClick={() => showDrawer(record)}>Edit</Button>
          <Button
            onClick={() => {
              deleteUser(record)
            }}
          >
            Delete
          </Button>
          {record.typeUser === 1 && <Button onClick={()=> showModal(record)}> Detail Student </Button> }
        </Space>
      )
    }
  ]

  return (
    <>
      <Table columns={columns} dataSource={listUsers} />
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
        >
          <Form.Item
            label='User Name'
            name='userName'
            initialValue={currentUserDrawer?.userName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='First Name'
            name='firstName'
            initialValue={currentUserDrawer?.firstName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Last Name'
            name='lastName'
            initialValue={currentUserDrawer?.lastName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            initialValue={currentUserDrawer?.email}
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              }
            ]}
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
      <Modal title='Student Info' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {currentUserModal.map((item,index)=>{
          return (<Card title={item.nameCourse} key={index}>
            <p>Point: {item.mark}</p>
            <p>Type Student: {checkTypeStudent(item.mark)}</p>
        </Card>)
        })
       }
      </Modal>
    </>
  )
}
export default ListUsers
