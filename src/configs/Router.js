import { notification, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { authApi } from '../api'
import {
  PATH,
  ROUTES
} from '../constants/common'
import { authActions, selectIsLoggedIn } from '../features/auth/authSlice'

export const PrivateRoute = (props) => {
  const dispatch = useDispatch()

  const [isCheckingToken, setIsCheckingToken] = useState(true)

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const location = useLocation()

  useEffect(() => {
    (async () => {
      try {
        console.log('Checking token...')

        const { success, data } = await authApi.getMe()

        if (!success || data?.code !== '1') {
          throw new Error(data.message || 'Invalid token')
        }

        const tokenResult = data.tokenResult?.value
        const user = {
          username: tokenResult?.sub,
          fullName: tokenResult?.fullName,
          role: tokenResult?.role
        }

        console.log('Token result', user)
        dispatch(authActions.checkTokenSuccess({ user }))
      } catch (error) {
        notification.error({
          message: error.message,
          description: 'Please log in again'
        })
        dispatch(authActions.logout())
      } finally {
        setIsCheckingToken(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isCheckingToken) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <Spin size='large' tip='Logging in...' />
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Redirect to={{ pathname: PATH.LOGIN, state: { from: location } }} />
  }

  return <Route {...props} />
}

const RouteRender = ({ path, component, exact }) => (
  <Route
    key={component}
    exact={exact}
    path={path}
    component={React.lazy(() => import(`../pages/${component}`))}
  />
)

export const PublicRoutes = ROUTES.PUBLIC.map((route) => {
  return <RouteRender key={route.component} {...route} />
})

export const PrivateRoutes = ROUTES.PRIVATE.map((route) => (
  <RouteRender key={route.component} {...route} />
))

export const StudentRoutes = ROUTES.STUDENT.map((route) => (
  <RouteRender key={route.component} {...route} />
))
