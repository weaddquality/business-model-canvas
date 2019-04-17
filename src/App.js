import Routes from './Routes'
import React, { useState, useEffect } from 'react'
import './App.css'
import './components/navigation-bar/Navigation-bar.css'
import { withRouter } from 'react-router-dom'
import NavigationBar from './components/navigation-bar/Navigation-bar'
import { Auth } from 'aws-amplify'
import { getItems } from './api/getItems'

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [listResponse, setListResponse] = useState([])

  useEffect(() => {
    userHasSession()
  }, [])

  const userHasSession = async () => {
    try {
      await Auth.currentSession()
      userHasAuthenticated(true)
    } catch (e) {
      if (e !== 'No current user') {
        alert(e.toString())
      }
    }

    handleIsAuthenticating(false)
  }

  const handleIsAuthenticating = authenticating => {
    setIsAuthenticating(authenticating)
  }

  const userHasAuthenticated = authenticated => {
    setIsAuthenticated(authenticated)
  }

  const getCanvasData = team => {
    getItems(team).then(response => {
      const { blocks } = response
      setListResponse(blocks)
    })
  }

  const handleLogout = async () => {
    await Auth.signOut()
    userHasAuthenticated(false)
    props.history.push('/logout')
  }

  const redirectToLogin = () => {
    props.history.push('/login')
  }

  const childProps = {
    isAuthenticated: isAuthenticated,
    userHasAuthenticated: userHasAuthenticated,
    handleLogout: handleLogout,
    redirectToLogin: redirectToLogin,
    getCanvasData: getCanvasData,
    listResponse: listResponse,
  }

  return (
    !isAuthenticating && (
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

export default withRouter(App)
