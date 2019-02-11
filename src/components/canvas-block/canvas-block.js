import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import './canvas-block.css'

const CanvasBlock = function(props) {
  const items = props.content.items.map(item => {
    return (
      <Card border="dark" style={{ width: '98%' }}>
        <Card.Header className="canvas-item-header">{item.header}</Card.Header>
        <Card.Body>
          <Card.Text>{item.text}</Card.Text>
        </Card.Body>
      </Card>
    )
  })

  return (
    <Link
      to={`/editor/${props.content.className}`}
      className={`${props.content.className} block`}
    >
      <div>
        <div className="canvas-blocks-container">
          <div className="canvas-blocks canvas-block-header">
            {props.content.header}
          </div>
          <div className="canvas-blocks canvas-block-description">
            {props.content.description}
          </div>
        </div>
        <div className="canvas-blocks canvas-block-item">{items}</div>
      </div>
    </Link>
  )
}

export default CanvasBlock
