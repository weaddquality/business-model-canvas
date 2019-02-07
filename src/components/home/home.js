import React from 'react'
import './home.css'
import logo from '../../images/logo.png'

const Home = () => {
  return (
    <div className="logo">
      <img src={logo} alt="" height="200px" />
      <div className="header">Business Model Canvas</div>
    </div>
  )
}

export default Home
