import React, { Fragment } from 'react'
import './Home.css'
import logo from '../../images/addq-logo.png'
import * as Constant from '../../constants/constants'

const Home = props => {
  return (
    <div className="home-logo">
      {!props.isAuthenticated ? (
        props.redirectToLogin()
      ) : (
        <Fragment>
          <img src={logo} alt="" />
          <div className="home-header">{Constant.APP_NAME}</div>
          <div className="home-text">{Constant.LOGIN_HAS_LOGGED_IN_TEXT}</div>
        </Fragment>
      )}
    </div>
  )
}

export default Home
