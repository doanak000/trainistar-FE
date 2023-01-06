import React, { useEffect, useState } from 'react'

import {
  Button, Drawer, Form,
  Input, InputNumber, Spin
} from 'antd'
import { userApi } from '../api'
import { Notification } from '../components/Notification/Notification'
import { NOTIFICATION_TYPE } from '../constants/common'
import ListUsers from '../features/users/ListUsers'
import { PageTitle } from '../components/page-title'
// const Context = React.createContext({
//   name: 'Default'
// })

const ListUserPage = () => {
  const [listUsers, setListUsers] = useState(null)
  const [isFetching, setIsFetching] = useState(true) // Init Loading State
  // const [optionTeacher, setOptionTeacher] = useState(null)
  const [openDrawerCreateUser, setOpenDrawerCreateUser] = useState(false)
  const showDrawerCreateUser = () => {
    setOpenDrawerCreateUser(true)
  }
  const onCloseDrawerCreateUser = () => {
    setOpenDrawerCreateUser(false)
  }

  // const onFinishFailedDrawerCreateUser = (errorInfo) => {
  //   console.log('Failed:', errorInfo)
  //   setOpenDrawerCreateUser(false)
  // }
  // const [api, contextHolder] = notification.useNotification()
  const fetchData = async () => {
    try {
      const { success, data } = await userApi.getAllUserApi()

      if (!success) {
        throw new Error(data)
      }

      // Handle Success
      console.log('Success', data)
      setListUsers(data)
    } catch (error) {
      // Handle Error
      console.error('Error', error?.message)
    } finally {
      setIsFetching(false)
    }
  }

  const deleteUser = async (record) => {
    try {
      const { success, data } = await userApi.deleteUser(record.userName)
      if (!success) {
        throw new Error(data)
      }
      data.code === '-1' &&
        Notification({
          type: NOTIFICATION_TYPE.ERROR,
          message: 'Can not delete'
        })
      fetchData()
    } catch (error) {
      // Handle Error
      console.error('Error', error?.message)
    } finally {
      setIsFetching(false)
    }
  }

  //   const updateUserById = async (idUser, dataBody) =>{
  //     try {
  //       const { success, data } = await courseApi.updateUserById(idUser,dataBody)
  //       if (!success) {
  //         throw new Error(data)
  //       }
  //       Notification({
  //             type: NOTIFICATION_TYPE.INFO,
  //             message: data?.message
  //           })
  //       fetchData()
  //     } catch (error) {
  //       // Handle Error
  //       console.error('Error', error?.message)
  //     } finally {
  //       setIsFetching(false)
  //     }
  //   }

  const onFinishDrawerCreateUser = async (values) => {
    console.log('SuccessCreateUser:', values)
    await userApi.createUser(values)
    fetchData()
    setOpenDrawerCreateUser(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <PageTitle title='Manager Users' renderRight={() => {
        return <Button onClick={showDrawerCreateUser} type='primary'>Create User</Button>
      }} />

      <div>
        {isFetching ? (
          <Spin />
        ) : (
          <ListUsers listUsers={listUsers} deleteUser={deleteUser} />
        )}
      </div>
      <Drawer
        title='Create Users'
        placement='right'
        onClose={onCloseDrawerCreateUser}
        open={openDrawerCreateUser}
      >
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinishDrawerCreateUser}
          autoComplete='off'
        >
          <Form.Item
            label='User Name'
            name='userName'
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='First Name' name='firstName' rules={[
            {
              required: true
            }
          ]}>
            <Input />
          </Form.Item>

          <Form.Item label='Last Name' name='lastName' rules={[
            {
              required: true
            }
          ]}>
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
          <Form.Item label='Phone Number' name='phoneNumber'>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label='Type User (1: Student, 2: Teacher)'
            name='typeUser'
          >
            <InputNumber max={2} min={1} style={{ width: '100%' }} defaultValue={1} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button onClick={onCloseDrawerCreateUser}>Cancel</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default ListUserPage
