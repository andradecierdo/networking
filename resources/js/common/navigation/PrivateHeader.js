import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const displayName = 'PrivateHeader';

const propTypes = {
  onRedirect: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

const PrivateHeader = ({onRedirect, user, logout}) => (
  <React.Fragment>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink exact to="/" className="nav-link">Home</NavLink>
        <NavLink exact to="/dashboard" className="nav-link">Dashboard</NavLink>
        <NavLink exact to="/experiences" className="nav-link">Experiences</NavLink>
      </Nav>
      <Nav>
        <NavDropdown alignRight title={user.firstName} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={() => onRedirect(`/users/edit`)}>
            <span className="fa fa-user-o" title="profile" aria-hidden="true"/> Profile
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={e => logout(e)}>
            <span className="fa fa-sign-out" title="logout" aria-hidden="true"/> Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </React.Fragment>
);

PrivateHeader.displayName = displayName
PrivateHeader.propTypes = propTypes

export default PrivateHeader
