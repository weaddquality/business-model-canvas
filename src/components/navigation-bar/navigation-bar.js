import React, { Fragment } from 'react'
import './navigation-bar.css'
import QLogo from '../../images/q-logo.png'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

const NavigationBar = ({ props }) => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="navbar-custom rounded"
    >
      <Navbar.Brand>
        <img
          alt=""
          src={QLogo}
          width="18"
          height="20"
          className="d-inline-block align-center"
        />
        <Link to="/" className="navbar-header">
          {' '}
          Business Model Canvas
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {props.isAuthenticated ? (
            <Nav.Link onClick={props.handleLogout}>
              <Link to="/signup" className="navbar-link">
                <span className="fa fa-sign-out" /> Logout
              </Link>
            </Nav.Link>
          ) : (
            <Fragment>
              <Nav.Link>
                <Link to="/signup" className="navbar-link">
                  <span className="fa fa-user" /> Signup
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/login" className="navbar-link">
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
