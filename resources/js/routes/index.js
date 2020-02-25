import React from 'react'
import { Router, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import _ from 'lodash'

import routes from './routes'
import PrivateRoute from './Private'
import PublicRoute from './Public'

import Layout from '../layout'
import AdminRoute from './Admin'

const history = createBrowserHistory()

const Routes = () => (
  <Router history={history}>
    <Switch>
      {routes.map((route, i) => {
        if (route.admin && route.auth) {
          const forAdminRoute = _.isNil(route.forAdmin) ? false : route.forAdmin;
          return <AdminRoute
            key={i}
            layout={Layout}
            forAdmin={forAdminRoute}
            {...route}/>
        }
        if (!route.admin && route.auth) {
          return <PrivateRoute key={i} layout={Layout} {...route} />
        }
        return <PublicRoute key={i} layout={Layout} {...route} />
      })}
    </Switch>
  </Router>
);

export default Routes
