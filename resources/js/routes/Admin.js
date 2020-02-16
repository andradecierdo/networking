import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AdminRoute = ({ component: Component, isAuthenticated, admin, ...rest }) => {
  return <Route {...rest} render={props => (
    isAuthenticated
      ? <Component {...props} {...rest} admin={admin}/>
      : <Redirect to={{
        pathname: '/admin/login',
        state: { from: props.location },
      }}/>
  )}/>
}

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
    user: store.user,
  }
}

export default connect(mapStateToProps)(AdminRoute)
