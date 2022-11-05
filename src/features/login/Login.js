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
import { useDispatch } from 'react-redux'
 import { useHistory } from 'react-router-dom'
import { loginSuccess } from './loginSlice'
import { NOTIFICATION_TYPE } from '../../constants/common'
import { translation } from '../../configs/translation'

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
 const dispatch = useDispatch()
  const history = useHistory()
   const [stopLogin, setStopLogin] = useState(false)
   const [loadingState, setLoadingState] = useState(false)
     const { from } =  { from: { pathname: '/' } }
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
// chưa có api nên tui để login auto đúng vô đC.
    const loginHandler = async () => {
    setStopLogin(true)
    setLoadingState(true)
    // CALL API ROI SET MAY CAI KIEU NHU NAY: displayName là để hiẹn thị name người dùng trên nav bar
// và role này kia cũng vậy, nói chung là lấy từ api về r gắn vô, để bắn lên store redux để lưu lại
          localStorage.setItem('access_token', `${null}`)
          localStorage.setItem('role', `${null}`)
          dispatch(
            loginSuccess({
              userInfo: {
                displayName: `${null}`,
                role: `${null}`,
                id: `${null}`
              }
            })
          )
            history.replace(from)
    
          setLoadingState(false)
  }
  
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
