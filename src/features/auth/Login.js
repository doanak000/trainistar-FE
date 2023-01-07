import { Button, Col, Form, Input, notification, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authApi } from '../../api'
import { AUTH_TOKEN_KEY, PATH } from '../../constants/common'
import { authActions } from './authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [isCheckingToken, setIsCheckingToken] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem(AUTH_TOKEN_KEY))

    if (isLoggedIn) {
      history.push(PATH.HOME)
    } else {
      setIsCheckingToken(false)
    }
  }, [history])

  const handleFinish = async (values) => {
    try {
      setIsLoading(true)

      const { success, data } = await authApi.login(values.role, values.username, values.password)
      console.log('🚀 ~ file: Login.js:32 ~ handleFinish ~ data', data)

      if (!success || data?.code !== '1') {
        throw new Error(data.message)
      }

      const {
        token,
        userDetails
      } = data.tokenResult.value

      const user = {
        id: userDetails.userId,
        username: userDetails.userName,
        fullName: userDetails.fullName,
        role: userDetails.userRole
      }

      notification.success({
        message: 'Login Success',
        description: 'Welcome to Trainistar'
      })

      dispatch(authActions.loginSuccess({ token, user }))
      history.replace(history.location.state?.from || '/')
    } catch (error) {

      notification.error({
        message: 'Login Failed',
        description: error.message
      })

      dispatch(authActions.loginFail())
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingToken) {
    return null
  }

  return (
    <Row>
      <Col span={8} offset={8}>
        <div className='h-screen flex items-center'>
          <div className='bg-white p-6 border rounded-md flex-1 shadow-sm'>
            <Form
              name='login'
              layout='vertical'
              //
              initialValues={{
                role: 'Student'
              }}
              onFinish={handleFinish}
            >
              <div className='flex justify-center'>
                <img src='/logo.svg' className='h-10' />
              </div>

              <Form.Item
                label='Role'
                name='role'
                rules={[
                  {
                    required: true,
                    message: 'Please select your role'
                  }
                ]}
              >
                <Select
                  placeholder='Select your role'
                  options={[
                    {
                      label: 'Admin',
                      value: 'Admin'
                    },
                    {
                      label: 'Manager',
                      value: 'Manager'
                    },
                    {
                      label: 'Trainer',
                      value: 'Trainer'
                    },
                    {
                      label: 'Student',
                      value: 'Student'
                    }
                  ]}
                />
              </Form.Item>

              <Form.Item
                label='Username'
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your username'
                  }
                ]}
              >
                <Input
                  placeholder='Username'
                />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please etner your password'
                  }
                ]}
              >
                <Input.Password
                  placeholder='Password'
                />
              </Form.Item>

              <Button type='primary' htmlType='submit' loading={isLoading} block>
                Login
              </Button>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Login
