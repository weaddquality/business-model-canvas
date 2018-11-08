import React from 'react';
import './grid.css';
import Area from '../area/area';
import areaObjects from '../area/content';

const Grid = () => {
  const areas = areaObjects.map((object) => {
    return <Area key={object.className} content={object} />
  })

  return (
    <div className="container">
      <div className="header">
        <h2>Business Model Canvas - Team Continuous</h2>
      </div>
      {areas}
    </div>
  )
}

export default Grid
