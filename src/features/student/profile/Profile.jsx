import { Button, Col, Form, Input, notification, Row } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { userApi } from '../../../api'
import { PageTitle } from '../../../components/page-title'
import { selectCurrentUser } from '../../auth/authSlice'

export const StudentProfile = () => {
  const currentUser = useSelector(selectCurrentUser)

  const [isLoading, setIsLoading] = useState(false)

  const handleFinish = async (values) => {
    try {
      setIsLoading(true)

      const { success, data } = await userApi.updateProfile({ ...values, userId: currentUser.id })

      if (!success || data?.code !== '1') {
        throw new Error('Update Profile Failed')
      }

      notification.success({
        message: 'Update Profile Success'
      })

    } catch (error) {
      notification.error({
        message: 'Update Profile Failed',
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <PageTitle title='Update Profile' />

      <Row>
        <Col span={12} offset={6}>
          <div className='bg-white rounded-md border p-4'>
            <Form
              name='update-profile'
              initialValues={{
                firstName: currentUser?.fullName?.split(' ')[0],
                lastName: currentUser?.fullName?.split(' ')[1]
              }}
              layout='vertical'
              //
              onFinish={handleFinish}
            >
              <Form.Item
                label='First Name'
                name='firstName'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your first name'
                  }
                ]}
              >
                <Input
                  placeholder='First Name'
                />
              </Form.Item>

              <Form.Item
                label='Last Name'
                name='lastName'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your last name'
                  }
                ]}
              >
                <Input
                  placeholder='Full Name'
                />
              </Form.Item>

              <Button type='primary' htmlType='submit' block loading={isLoading}>
                Save
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}
