import React from 'react';
import { Link } from 'react-router-dom'

const area = function (props) {
  return (
    <Link to="/detail" className={`${props.content.className} area`}>
      <div>
        <h3>{props.content.header}</h3>
        <h4>{props.content.description}</h4>
        <p>{props.content.items}</p>
      </div>
    </Link>
  );
}

export default area;
