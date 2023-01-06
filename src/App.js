import React, { Suspense } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { AdminLayout } from './containers/layout'
import { PublicRoutes, PrivateRoutes, PrivateRoute } from './configs/Router'
import { PATH } from './constants/common'

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={<div />}
      >
        <Switch>
          {PublicRoutes}

          <PrivateRoute path='/admin'>
            <AdminLayout>
              {PrivateRoutes}
            </AdminLayout>
          </PrivateRoute>

          <Redirect to={PATH.HOME} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
