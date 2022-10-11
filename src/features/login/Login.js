import React, { useState } from 'react'
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

const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 24
  }
}
const Login = () => {
 // const dispatch = useDispatch()
 // const location = useLocation()
 // const history = useHistory()
  // const translation = useSelector(selectTranslation)
  // const { from } = location.state || { from: { pathname: '/' } }
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    setUser({
      ...user,
      [event?.target?.name]: event?.target?.value
    })
  }

  const loginHandler = () => {}
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <WrapperLogin>
      <WrapperLoginForm>
        <Form
          size='large'
          {...layout}
          name='basic'
          initialValues={{
            remember: true
          }}
          onFinish={loginHandler}
          onFinishFailed={onFinishFailed}
        >
          <TitleLogin>Login</TitleLogin>
          <Form.Item
            size='large'
            id='username'
            label={<LoginLable>Username</LoginLable>}
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input
              placeholder='username'
              onChange={handleChange}
              name='username'
            />
          </Form.Item>

          <Form.Item
            id='password'
            label={<LoginLable>Password</LoginLable>}
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input
              placeholder='password'
              onChange={handleChange}
              name='password'
              type='password'
            />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <LoginButton type='primary' htmlType='submit'>
              Submit
            </LoginButton>
          </Form.Item>
        </Form>
      </WrapperLoginForm>
    </WrapperLogin>
  )
}

export default Login
