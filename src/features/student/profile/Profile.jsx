import { Button, Col, Form, Input, notification, Row } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { PageTitle } from '../../../components/page-title'
import { selectCurrentUser } from '../../auth/authSlice'

export const StudentProfile = () => {
  const currentUser = useSelector(selectCurrentUser)

  const [isLoading, setIsLoading] = useState(false)

  const handleFinish = async (values) => {
    try {
      setIsLoading(true)

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
                fullName: currentUser.fullName
              }}
              layout='vertical'
              //
              onFinish={handleFinish}
            >
              <Form.Item
                label='Full Name'
                name='fullName'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your full name'
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
