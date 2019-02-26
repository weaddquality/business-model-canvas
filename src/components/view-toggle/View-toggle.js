import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ViewToggle = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div data-testid="viewToggleButton">
      {toggle ? (
        <Link to="/canvas">
          <i className="fa fa-th" onClick={handleToggle} />
        </Link>
      ) : (
        <Link to="/horizontal">
          <i className="fa fa-align-justify" onClick={handleToggle} />
        </Link>
      )}
    </div>
  )
}

export default ViewToggle
