import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchUser, logout} from '../../modules/auth/service'

import Navbar from 'react-bootstrap/Navbar';
import PrivateHeader from './PrivateHeader'
import PublicHeader from './PublicHeader'

class Navigation extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    const { isAuthenticated, user } = this.props;
    if (isAuthenticated && !user.id) {
      this.props.dispatch(fetchUser())
    }
  }
  
  logout(e) {
    e.preventDefault()
    this.props.dispatch(logout())
  }

  handleRedirect(route) {
    this.props.history.push(route);
  }
  
  render() {
    const {isAuthenticated, user} = this.props
    return (
      <Navbar variant="dark" bg="dark" expand="lg">
        <span className="navbar-brand">SBE</span>
        {
          isAuthenticated
            ? <PrivateHeader
                user={user}
                onRedirect={this.handleRedirect}
                logout={this.logout}/>
            : <PublicHeader/>
        }
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user
  }
}

export default connect(mapStateToProps)(Navigation)
