import React from 'react'
import './Not-found.css'
import { Link } from 'react-router-dom'
import * as Constant from '../../constants/constants'

const NotFound = () => {
  return (
    <div>
      <div className="not-found">
        <h1>{Constant.NOT_FOUND_404_TEXT}</h1>
      </div>
      <div className="go-back-to-canvas">
        <Link to="/canvas">{Constant.GO_BACK_TO_CANVAS}</Link>
      </div>
    </div>
  )
}

export default NotFound
