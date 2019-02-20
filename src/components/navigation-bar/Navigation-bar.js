import React, { Fragment } from 'react'
import './Navigation-bar.css'
import QLogo from '../../images/q-logo.png'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const renderCanvasDropdownIfAuthenticated = props => {
  if (props.isAuthenticated) {
    return (
      <Dropdown as={ButtonGroup}>
        <Button variant="success">
          <Link to="/canvas">Team Continuous</Link>
        </Button>
        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item href="/canvas">Team Continuous</Dropdown.Item>
          <Dropdown.Item href="#/canvas2">Team UX & Mobilt</Dropdown.Item>
          <Dropdown.Item href="#/canvas3">Team XXX</Dropdown.Item>
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
              <Nav.Link>
                <Link to="/canvas">
                  <i className="fa fa-th canvas-view-button" />
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/horizontal">
                  <i className="fa fa-align-justify canvas-view-button" />
                </Link>
              </Nav.Link>
              <Nav.Link className="canvas-view-button">|</Nav.Link>
              <Nav.Link onClick={props.handleLogout}>
                <Link to="/signup" className="navbar-link">
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
