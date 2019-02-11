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
        <div className="canvas-blocks canvas-block-header ">
          {props.content.header}
        </div>
        <div className="canvas-blocks canvas-block-description">
          {props.content.description}
        </div>
        <div className="canvas-blocks canvas-block-item">{items}</div>
      </div>
    </Link>
  )
}

export default CanvasBlock
