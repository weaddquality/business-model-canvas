import Routes from './Routes'
import React, { Component } from 'react'
import './App.css'
import './components/navigation-bar/Navigation-bar.css'
import { withRouter } from 'react-router-dom'
import NavigationBar from './components/navigation-bar/Navigation-bar'
import { Auth } from 'aws-amplify'

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    isHorizontalViewToggled: false,
  }

  async componentDidMount() {
    try {
      await Auth.currentSession()
      this.userHasAuthenticated(true)
    } catch (e) {
      if (e !== 'No current user') {
        alert(e)
      }
    }

    this.setState({ isAuthenticating: false })
  }

  toggleHorizontalView = () => {
    this.setState({ isHorizontalViewToggled: !this.state.isHorizontalViewToggled })
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  handleLogout = async () => {
    await Auth.signOut()
    this.userHasAuthenticated(false)
    this.props.history.push('/login')
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
      isHorizontalViewToggled: this.state.isHorizontalViewToggled,
      toggleHorizontalView: this.toggleHorizontalView,
    }
    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <div className="background-container">
            <div className="background-image" />
            <NavigationBar props={childProps} />
            <Routes props={childProps} />
          </div>
        </div>
      )
    )
  }
}

export default withRouter(App)
