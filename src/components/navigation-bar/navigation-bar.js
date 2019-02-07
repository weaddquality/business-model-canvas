import React, { Fragment } from 'react'
import './navigation-bar.css'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

const NavigationBar = ({ props }) => {
  return (
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Business Model Canvas</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {props.isAuthenticated ? (
            <NavItem onClick={props.handleLogout}>Logout</NavItem>
          ) : (
            <Fragment>
              <NavItem>
                <Link to="/signup">Signup</Link>
              </NavItem>
              <NavItem>
                <Link to="/login">Login</Link>
              </NavItem>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
