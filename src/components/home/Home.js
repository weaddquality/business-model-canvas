import React, { Fragment } from 'react'
import './Home.css'
import logo from '../../images/addq-logo.png'

const Home = props => {
  return (
    <div className="home-logo">
      {!props.isAuthenticated ? (
        props.redirectToLogin()
      ) : (
        <Fragment>
          <img src={logo} alt="" />
          <div className="home-header">Business Model Canvas</div>
          <div className="home-text">You are now logged in..</div>
        </Fragment>
      )}
    </div>
  )
}

export default Home
