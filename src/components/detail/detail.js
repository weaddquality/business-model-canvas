import React from 'react';
import { Link } from 'react-router-dom'

const Detail = () => {
  return (
    <div>
      <h2>A page of our areas</h2>
      <div>
        <Link to="/">
          Go back to grid
      </Link>
      </div>
    </div>

  )
}

export default Detail;
