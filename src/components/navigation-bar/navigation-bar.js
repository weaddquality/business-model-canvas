import React, { Fragment } from 'react'
import './navigation-bar.css'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

const NavigationBar = ({ props }) => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="rounded navbar-custom"
    >
      <Navbar.Brand>
        <Link to="/" className="header">
          Business Model Canvas
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {props.isAuthenticated ? (
            <Nav.Link onClick={props.handleLogout}>
              <Link to="/signup" className="link">
                <span className="fa fa-sign-out" /> Logout
              </Link>
            </Nav.Link>
          ) : (
            <Fragment>
              <Nav.Link>
                <Link to="/signup" className="link">
                  <span className="fa fa-user" /> Signup
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/login" className="link">
                  <span className="fa fa-sign-in" /> Login
                </Link>
              </Nav.Link>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
