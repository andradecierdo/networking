import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import User from '../modules/user/User'

class Admin extends Component {

  static propTypes = {
    component: PropTypes.func.isRequired,
    // location: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    forAdmin: PropTypes.bool.isRequired,
  };

  render() {
    const {
      forAdmin,
      // location,
      user,
      isAuthenticated,
      layout: Layout,
      admin,
      component: Component,
      ...rest } = this.props;

    return <Route {...rest} render={props => {
      if (isAuthenticated && admin) {
        if (!user.id) {
          return <Layout admin={admin}><Component {...props}/></Layout>;
        } else {
          if (user.isAdmin) {
            return <Layout admin={admin} forAdmin={forAdmin}><Component {...props}/></Layout>;
          }
          return <Redirect to={{ pathname: '/', }}/>;
        }
      }
      return <Redirect to={{ pathname: '/admin/login', }}/>;
    }}/>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user ? new User(state.user) : new User({}),
  }
}

export default connect(mapStateToProps)(Admin)
