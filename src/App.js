import React, { Suspense } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import Spinner from './components/spinner/Spinner'
import LayoutAdmin from './containers/layout/Layout'
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
            <LayoutAdmin>
              {PrivateRoutes}
            </LayoutAdmin>
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
