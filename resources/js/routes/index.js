import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import routes from './routes'
import PrivateRoute from './Private'
import PublicRoute from './Public'
import Layout from '../layout'
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

import {APP_URL_PREFIX} from '../values/index'

const Routes = () => (
  <Router history={history} basename={APP_URL_PREFIX}>
    <Layout>
      <Switch>
        {routes.map((route, i) => {
          if (route.auth) {
            return <PrivateRoute key={i} {...route} />
          }
          return <PublicRoute key={i} {...route} />
        })}
      </Switch>
    </Layout>
  </Router>
)

export default Routes
