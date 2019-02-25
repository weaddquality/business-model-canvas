import React, { Fragment } from 'react'
import './Navigation-bar.css'
import QLogo from '../../images/q-logo.png'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ViewToggle from '../view-toggle/View-toggle'

const renderCanvasDropdownIfAuthenticated = props => {
  if (props.isAuthenticated) {
    return (
      <Dropdown as={ButtonGroup}>
        <Button variant="black" className="navbar-dropdown">
          <Link to="/canvas" className="navbar-dropdown">
            Team Continuous
          </Link>
        </Button>
        <Dropdown.Toggle split variant="black" className="navbar-dropdown-arrow" />
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/canvas" className="navbar-dropdown-submenu">
              Team Continuous
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/canvas-none-existing" className="navbar-dropdown-submenu">
              Team Frontend Auto
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/canvas-none-existing" className="navbar-dropdown-submenu">
              Team Mobile
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const NavigationBar = ({ props }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom rounded" collapseOnSelect>
      <Navbar.Brand>
        <img alt="" src={QLogo} width="18" height="20" className="d-inline-block align-center" />
        <Link to="/" className="navbar-header">
          {' '}
          Business Model Canvas
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>{renderCanvasDropdownIfAuthenticated(props)}</Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {props.isAuthenticated ? (
            <Fragment>
              <Nav.Link>
                <Link to="/item/create" className="navbar-link">
                  <i className="fa fa-plus" /> Create item
                </Link>
              </Nav.Link>
              <Nav.Link className="canvas-view-button">
                <ViewToggle />
              </Nav.Link>
              <Nav.Link className="canvas-view-button">|</Nav.Link>
              <Nav.Link onClick={props.handleLogout}>
                <Link to="/logout" className="navbar-link">
                  <i className="fa fa-sign-out" /> Logout
                </Link>
              </Nav.Link>
            </Fragment>
          ) : (
            <Fragment>
              <Nav.Link>
                <Link to="/signup" className="navbar-link">
                  <i className="fa fa-user" /> Signup
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/login" className="navbar-link">
                  <i className="fa fa-sign-in" /> Login
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
