import React, { Fragment } from 'react'
import './navigation-bar.css'
import { Link } from 'react-router-dom'
import {
  Nav,
  Navbar,
  NavItem,
  ButtonToolbar,
  DropdownButton,
  Dropdown,
  Button,
} from 'react-bootstrap'
// import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
// import Dropdown from 'react-bootstrap/lib/Dropdown';
// import DropdownButton from 'react-bootstrap/lib/DropdownButton';
// import DropdownItem from 'react-bootstrap/lib/DropdownItem';

const NavigationBar = ({ props }) => {
  return (
    <Navbar fluid collapseOnSelect className="navbar navbar-inverse">
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Business Model Canvas</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {props.isAuthenticated ? (
            <NavItem onClick={props.handleLogout}>
              <span className="glyphicon glyphicon-log-out" /> Logout
            </NavItem>
          ) : (
            <Fragment>
              <NavItem>
                <Link to="/signup">
                  <span className="glyphicon glyphicon-user" /> Signup
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/login">
                  <span className="glyphicon glyphicon-log-in" /> Login
                </Link>
              </NavItem>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
