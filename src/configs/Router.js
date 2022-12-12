import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { AUTH_TOKEN_KEY, FAKE_USER, PATH, ROUTES } from '../constants/common'
import LayoutAdmin from '../containers/layout/Layout'
import { authActions, selectIsLoggedIn } from '../features/auth/authSlice'

export const PrivateRoute = (props) => {
  const dispatch = useDispatch()

  const [isCheckingToken, setIsCheckingToken] = useState(true)

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const location = useLocation()

  useEffect(() => {
    console.log('Checking token...')

    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      dispatch(authActions.loginSuccess(FAKE_USER))
    }
    setIsCheckingToken(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isCheckingToken) {
    return null
  }

  if (!isLoggedIn) {
    return <Redirect to={{ pathname: PATH.LOGIN, state: { from: location } }} />
  }

  return (
    <Route {...props} />
  )
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
