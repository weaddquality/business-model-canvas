import React from 'react'
import './home.css'
import logo from '../../images/addq-logo.png'

const Home = () => {
  return (
    <div className="home-logo">
      <img src={logo} alt="" height="200px" />
      <div className="home-header">Business Model Canvas</div>
    </div>
  )
}

export default Home
