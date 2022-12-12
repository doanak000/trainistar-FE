import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { loginFail, loginSuccess } from './loginSlice'
// import {  useLocation } from 'react-router-dom'
// import { Notification } from '../../components/Notification/Notification'
// import { NOTIFICATION_TYPE } from '../../constants/common'
// import { selectTranslation } from '../language/languageSlice'
import { Form, Input, Checkbox } from 'antd'
import {
  LoginButton,
  LoginLable,
  TitleLogin,
  WrapperLogin,
  WrapperLoginForm
} from './Login.style'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { AUTH_ROLE_KEY, AUTH_TOKEN_KEY, FAKE_USER, NOTIFICATION_TYPE, PATH, ROLE } from '../../constants/common'
import { translation } from '../../configs/translation'
import { authActions, selectIsLoggedIn } from './authSlice'
import { delay } from '../../utils'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [isCheckingToken, setIsCheckingToken] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem(AUTH_TOKEN_KEY)
    if (isLoggedIn) {
      history.push(PATH.HOME)
    } else {
      setIsCheckingToken(false)
    }
  }, [history])

  const handleFinish = async (values) => {
    console.log('handleFinish', values)

    setIsLoading(true)

    await delay()

    const accessToken = 'GXr1Vb6wk98dP+P9'
    const role = FAKE_USER.role

    localStorage.setItem(AUTH_TOKEN_KEY, accessToken)
    localStorage.setItem(AUTH_ROLE_KEY, role)

    dispatch(authActions.loginSuccess(FAKE_USER))

    setIsLoading(false)

    history.replace(history.location.state?.from ?? '/')
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
