import React from 'react'
import './Logout.css'
import logo from '../../images/addq-logo.png'

const Logout = () => {
  return (
    <div className="logout-container">
      <img src={logo} alt="" />
      <div className="logout-header">Business Model Canvas</div>
      <div className="logout-text">You are now logged out..</div>
    </div>
  )
}

export default Logout
