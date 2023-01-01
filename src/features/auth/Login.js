import React, { useEffect, useState } from 'react'
import { Notification } from '../../components/Notification/Notification'
import { Form, Input, Checkbox, notification } from 'antd'
import {
  LoginButton,
  LoginLable,
  TitleLogin,
  WrapperLogin,
  WrapperLoginForm
} from './Login.style'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { AUTH_ROLE_KEY, AUTH_TOKEN_KEY, AUTH_USER_DATA_KEY, PATH, ROLE } from '../../constants/common'
import { translation } from '../../configs/translation'
import { authActions, selectIsLoggedIn } from './authSlice'
import { delay } from '../../utils'
import { authApi } from '../../api'
import _ from 'lodash'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [isCheckingToken, setIsCheckingToken] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const user = JSON.parse(localStorage.getItem(AUTH_USER_DATA_KEY))
    const isLoggedIn = !!token && !!user

    if (isLoggedIn) {
      history.push(PATH.HOME)
    } else {
      setIsCheckingToken(false)
    }
    //
  }, [history])

  const handleFinish = async (values) => {
    try {
      setIsLoading(true)

      const { success, data } = await authApi.login(values.username, values.password)

      if (!success || data.code !== '1') {
        throw new Error('Failed to login')
      }

      const accessToken = 'GXr1Vb6wk98dP+P9'
      const user = {
        username: values.username,
        fullName: data.name,
        role: data.role
      }

      localStorage.setItem(AUTH_TOKEN_KEY, accessToken)
      localStorage.setItem(AUTH_ROLE_KEY, user.role)
      localStorage.setItem(AUTH_USER_DATA_KEY, JSON.stringify(user))

      dispatch(authActions.loginSuccess(user))
      history.replace(_.get(history, 'location.state.from') || '/')

    } catch (error) {
      console.log(error)

      dispatch(authActions.loginFail())

      notification.error({
        message: 'Login failed',
        description: error.message
      })

    } finally {
      setIsLoading(false)
    }
  }

  const handleFinishFailed = (errorInfo) => {
    console.log('handleFinishFailed', errorInfo)
  }

  if (isCheckingToken) {
    return null
  }

  return (
    <WrapperLogin>
      <WrapperLoginForm>
        <Form
          name='login'
          initialValues={{
            remember: true
          }}

          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}

          size='large'
          layout='vertical'
        >
          <TitleLogin>Login</TitleLogin>

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

          <Form.Item>
            <LoginButton type='primary' htmlType='submit' loading={isLoading} block>
              Submit
            </LoginButton>
          </Form.Item>
        </Form>
      </WrapperLoginForm>
    </WrapperLogin>
  )
}

export default Login
