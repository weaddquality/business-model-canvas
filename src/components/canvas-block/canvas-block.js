import React from 'react'
import { Link } from 'react-router-dom'
import './canvas-block.css'

const CanvasBlock = function(props) {
  const items = props.content.items.map((item, index) => {
    return <p key={index}>{item}</p>
  })

  return (
    <Link
      to={`/editor/${props.content.className}`}
      className={`${props.content.className} block`}
    >
      <div>
        <h3>{props.content.header}</h3>
        <h4>{props.content.description}</h4>
        {items}
      </div>
    </Link>
  )
}

export default CanvasBlock
