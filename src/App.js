import React, { Suspense } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { AdminLayout, StudentLayout } from './containers/layout'
import { PublicRoutes, PrivateRoutes, PrivateRoute, StudentRoutes } from './configs/Router'
import { PATH } from './constants/common'

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={<div />}
      >
        <Switch>
          {PublicRoutes}

          <PrivateRoute path='/admin' roles={['Admin', 'Manager', 'Trainer']}>
            <AdminLayout>
              {PrivateRoutes}
            </AdminLayout>
          </PrivateRoute>

          <PrivateRoute path='/' roles={['Student']}>
            <StudentLayout>
              {StudentRoutes}
            </StudentLayout>
          </PrivateRoute>

          <Redirect to={PATH.HOME} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
