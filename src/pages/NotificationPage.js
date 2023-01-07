import React, { useEffect, useState } from 'react'

import {
  Alert,
  Button, Drawer, Form,
  Input, Spin
} from 'antd'
import { notificationApi } from '../api'
import { PageTitle } from '../components/page-title'
// const Context = React.createContext({
//   name: 'Default'
// })

const NotificationPage = () => {
  const [listNotifications, setListNotifications] = useState(null)
  const [isFetching, setIsFetching] = useState(true) // Init Loading State
  // const [optionTeacher, setOptionTeacher] = useState(null)
  const [openDrawerCreateNotification, setOpenDrawerCreateNotification] = useState(false)
  const showDrawerCreateNotification = () => {
    setOpenDrawerCreateNotification(true)
  }
  const onCloseDrawerCreateNotification = () => {
    setOpenDrawerCreateNotification(false)
  }

  // const onFinishFailedDrawerCreateNotification = (errorInfo) => {
  //   console.log('Failed:', errorInfo)
  //   setOpenDrawerCreateNotification(false)
  // }
  // const [api, contextHolder] = notification.useNotification()
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
    await notificationApi.createNotification(values?.data)
    fetchData()
    setOpenDrawerCreateNotification(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <PageTitle title='Manage Notifications' renderRight={() => <Button type='primary' onClick={showDrawerCreateNotification}>Create Notification</Button>} />

      <div>
        {isFetching ? (
          <Spin />
        ) : (
          <div className='space-y-2'>
            {listNotifications?.slice(0, 5).map((item, index) => {
              return (
                <Alert key={index} message={item?.data} />
              )
            })}
          </div>
        )}
      </div>

      <Drawer
        title='Create Notification'
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
