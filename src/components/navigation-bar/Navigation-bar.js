import React, { Fragment } from 'react'
import './Navigation-bar.css'
import QLogo from '../../images/q-logo.png'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ViewToggle from '../view-toggle/View-toggle'

const renderLeftDropdown = props => {
  const handleTeamChange = event => {
    props.handleTeamChange({ text: event.target.text, href: event.target.getAttribute('href') })
  }

  if (props.isAuthenticated) {
    return (
      <Dropdown as={ButtonGroup}>
        <Button variant="black" data-testid="navbarDropdownSplitButton">
          <Link to={props.selectedTeam.href}>{props.selectedTeam.text}</Link>
        </Button>
        <Dropdown.Toggle
          split
          variant="black"
          className="navbar-dropdown-arrow"
          data-testid="navbarDropdownSubmenuToggle"
        />
        <Dropdown.Menu data-testid="navbarDropdownSubmenu">
          <LinkContainer to="/Team-Continuous/canvas" className="navbar-dropdown-submenu" replace>
            <Dropdown.Item onClick={handleTeamChange}>Team Continuous</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/Team-Frontendauto/canvas" className="navbar-dropdown-submenu" replace>
            <Dropdown.Item onClick={handleTeamChange}>Team Frontend Auto</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/Team-Mobileux/canvas" className="navbar-dropdown-submenu" replace>
            <Dropdown.Item onClick={handleTeamChange}>Team Mobile</Dropdown.Item>
          </LinkContainer>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const renderRightComponents = props => {
  if (props.isAuthenticated) {
    return (
      <Nav>
        <Fragment>
          <Nav.Item className="canvas-view-button navbar-react-router-link">
            <ViewToggle />
          </Nav.Item>
          <Nav.Item className="navbar-react-router-link canvas-view-button navbar-separator">
            |
          </Nav.Item>
          <Nav.Item className="navbar-react-router-link" onClick={props.handleLogout}>
            <Link to="/logout" data-testid="navbarLogoutButton">
              <i className="fa fa-sign-out" /> Logout
            </Link>
          </Nav.Item>
        </Fragment>
      </Nav>
    )
  } else {
    return (
      <Nav>
        <Fragment>
          <Nav.Item className="navbar-react-router-link">
            <Link to="/signup">
              <i className="fa fa-user" /> Signup
            </Link>
          </Nav.Item>
          <Nav.Item className="navbar-react-router-link">
            <Link to="/login">
              <i className="fa fa-sign-in" /> Login
            </Link>
          </Nav.Item>
        </Fragment>
      </Nav>
    )
  }
}

const NavigationBar = ({ props }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom rounded" collapseOnSelect>
      <Navbar.Brand>
        <img alt="" src={QLogo} className="navbar-logo-image" />
        <Link to="/" className="navbar-header">
          Business Model Canvas
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>{renderLeftDropdown(props)}</Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        {renderRightComponents(props)}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
