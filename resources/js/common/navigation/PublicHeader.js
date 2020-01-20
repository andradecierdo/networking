import React from 'react'

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from 'react-router-dom'

const displayName = 'PublicHeader'

const PublicHeader = () => (
  <React.Fragment>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink exact to="/" className="nav-link">Home</NavLink>
      </Nav>
      <Nav>
        <NavLink exact to="/login" className="nav-link">Login</NavLink>
      </Nav>
    </Navbar.Collapse>
  </React.Fragment>
)

PublicHeader.displayName = displayName

export default PublicHeader
