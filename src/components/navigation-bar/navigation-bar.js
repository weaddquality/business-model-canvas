import React from 'react'
import './navigation-bar.css'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavItem, ButtonGroup, Button } from 'react-bootstrap'

const NavigationBar = () => {
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
          <NavItem>
            <ButtonGroup>
              <Link to="/">
                <Button>Grid</Button>
              </Link>
              <Link to="/horizontal">
                <Button>Horizontal</Button>
              </Link>
            </ButtonGroup>
          </NavItem>
          <NavItem>
            <Link to="/signup">Signup</Link>
          </NavItem>
          <NavItem>
            <Link to="/login">Login</Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
