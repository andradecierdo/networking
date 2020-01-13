import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchUser } from '../modules/auth/service'

import PrivateLayout from './Private'
import PublicLayout from './Public'

class Layout extends Component {
  static displayName = 'Layout'
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { isAuthenticated, user } = this.props;
    if (isAuthenticated && !user.id) {
      this.props.dispatch(fetchUser())
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAuthenticated, user } = this.props;
    if (isAuthenticated && !user.id) {
      this.props.dispatch(fetchUser())
    }
  }

  render() {
    const {
      children,
      history,
      isAuthenticated,
      ...props
    } = this.props
    if (isAuthenticated) {
      return <PrivateLayout history={history} {...props}>{children}</PrivateLayout>
    }
    return <PublicLayout history={history} {...props}>{children}</PublicLayout>
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user,
  }
}

export default withRouter(connect(mapStateToProps)(Layout))
