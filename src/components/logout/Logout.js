import React from 'react'
import './Logout.css'
import logo from '../../images/addq-logo.png'
import * as Constant from '../../constants/constants'

const Logout = () => {
  return (
    <div className="logout-container">
      <img src={logo} alt="" />
      <div className="logout-header">{Constant.APP_NAME}</div>
      <div className="logout-text">{Constant.LOGIN_HAS_LOGGED_OUT_TEXT}</div>
    </div>
  )
}

export default Logout
