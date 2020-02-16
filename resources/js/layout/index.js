import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchUser } from '../modules/auth/service'
import PrivateLayout from './PrivateLayout'
import PublicLayout from './PublicLayout'
import AdminLayout from './AdminLayout';

class Layout extends Component {
  static displayName = 'Layout';
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    admin: PropTypes.bool,
  };

  componentDidMount() {
    const { isAuthenticated, user } = this.props;
    if (isAuthenticated && !user.id) {
      this.props.dispatch(fetchUser())
    }
  }

  render() {
    const { children, admin, user, ...props} = this.props;

    if (this.props.isAuthenticated && user.isAdmin) {
      return <AdminLayout {...this.props}>{children}</AdminLayout>
    }

    if (this.props.isAuthenticated && !user.isAdmin) {
      return <PrivateLayout {...this.props}>{children}</PrivateLayout>;
    }

    return <PublicLayout {...this.props}>{children}</PublicLayout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user,
  }
};

export default withRouter(connect(mapStateToProps)(Layout))
