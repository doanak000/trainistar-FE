import React, { useEffect, useState } from 'react'

import { courseApi, sampleApi, notificationApi } from '../api'
import {
  Spin,
  notification,
  Button,
  Form,
  Input,
  Drawer,
  Select,
  InputNumber
} from 'antd'
import { NOTIFICATION_TYPE } from '../constants/common'
import { Notification } from '../components/Notification/Notification'
const Context = React.createContext({
  name: 'Default'
})

const NotificationPage = () => {
  const [listNotifications, setListNotifications] = useState(null)
  const [isFetching, setIsFetching] = useState(true) // Init Loading State
  const [optionTeacher, setOptionTeacher] = useState(null)
  const [openDrawerCreateNotification, setOpenDrawerCreateNotification] = useState(false)
  const showDrawerCreateNotification = () => {
    setOpenDrawerCreateNotification(true)
  }
  const onCloseDrawerCreateNotification = () => {
    setOpenDrawerCreateNotification(false)
  }

  const onFinishFailedDrawerCreateNotification = (errorInfo) => {
    console.log('Failed:', errorInfo)
    setOpenDrawerCreateNotification(false)
  }
  const [api, contextHolder] = notification.useNotification()
  const fetchData = async () => {
    try {
      const { success, data } = await notificationApi.getAllNotificationApi()

      if (!success) {
        throw new Error(data)
      }

      // Handle Success
      console.log('Success', data)
      setListNotifications(data)
    } catch (error) {
      // Handle Error
      console.error('Error', error?.message)
    } finally {
      setIsFetching(false)
    }
  }

  const onFinishDrawerCreateNotification = async (values) => {
    console.log('SuccessCreateNotification:', values)
    const { success, data } = await notificationApi.createNotification(values?.data)
    fetchData()
    setOpenDrawerCreateNotification(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>List Notification Page</h1>
      <Button onClick={showDrawerCreateNotification}>Create new notification</Button>
      <div>
        {isFetching ? (
          <Spin />
        ) : (<>
            {listNotifications?.slice(0, 5).map((item,index)=>{
                return (
                    <div style={{border: '1px solid black', padding: '10px 10px 10px 10px',marginTop:'20px',width: '100vh'}} key={index}>
                        <p>{item?.data}</p>
                    </div>
                )
            })}</>)}
      </div>
      <Drawer
        title='Create Notifications'
        placement='right'
        onClose={onCloseDrawerCreateNotification}
        open={openDrawerCreateNotification}
      >
        <Form
          name='Notification'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinishDrawerCreateNotification}
          autoComplete='off'
        >
          <Form.Item
            label='Notification'
            name='data'
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button onClick={onCloseDrawerCreateNotification}>Cancel</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default NotificationPage
