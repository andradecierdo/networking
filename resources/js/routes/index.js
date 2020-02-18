import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import routes from './routes'
import PrivateRoute from './Private'
import PublicRoute from './Public'
import AdminRoute from './Admin'
import Layout from '../layout'

//TODO reimplement to have same implementation with CM. check downloaded assets folder
const Routes = () => (
  <Router>
    <Layout>
      <Switch>
        {routes.map((route, i) => {
          // console.log('route', route);
          if (route.auth) {
            if (route.admin) {
              return <AdminRoute key={i} {...route} />
            } else {
              return <PrivateRoute key={i} {...route} />
            }
          }
          return <PublicRoute key={i} {...route} />
        })}
      </Switch>
    </Layout>
  </Router>
)

export default Routes
