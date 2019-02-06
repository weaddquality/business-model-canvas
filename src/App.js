import Routes from './Routes'
import React, { Component } from 'react'
import './App.css'
import './components/navigation-bar/navigation-bar.css'
import { Link } from 'react-router-dom'
import { ButtonGroup, Button } from 'react-bootstrap'
import NavigationBar from './components/navigation-bar/navigation-bar'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
    }
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  handleLogout = () => {
    this.userHasAuthenticated(false)
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
    }
    return (
      <div className="App">
        <NavigationBar props={childProps} />
        <div className="view">
          <ButtonGroup>
            <Link to="/">
              <Button>Grid</Button>
            </Link>
            <Link to="/horizontal">
              <Button>Horizontal</Button>
            </Link>
          </ButtonGroup>
        </div>
        <Routes props={childProps} />
      </div>
    )
  }
}

export default App
