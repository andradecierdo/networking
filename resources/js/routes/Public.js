import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const Public = (props) => {
  const { layout: Layout, component: Component, admin, ...rest } = props;
  return <Route {...rest} render={props => (<Layout isAdminRoute={admin}><Component {...props}/></Layout>)}/>
}

Public.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default Public
