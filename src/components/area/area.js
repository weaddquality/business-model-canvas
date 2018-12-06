import React from 'react';
import { Link } from 'react-router-dom'
import './area.css'

const area = function (props) {

  const items = props.content.items.map((item, index) => {
    return <p key={index}>{item}</p>
  })


  return (
    <Link to={`/detail/${props.content.className}`} className={`${props.content.className} area`}>
      <div>
        <h3>{props.content.header}</h3>
        <h4>{props.content.description}</h4>
        {items}
      </div>
      </Link>
  );
}

export default area;
