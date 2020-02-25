import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const Private = ({ layout: Layout, component: Component, isAuthenticated, ...rest }) => {
  return <Route {...rest} render={props => (
    isAuthenticated
      ? <Layout><Component {...props}/></Layout>
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
  )}/>
};

Private.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
    user: store.user,
  }
}

export default connect(mapStateToProps)(Private)
