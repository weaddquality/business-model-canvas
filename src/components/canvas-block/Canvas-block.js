import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import './Canvas-block.css'

const headerSubString = item => {
  const maxCharacters = 34
  if (item.length > maxCharacters) {
    item = `${item.substring(0, maxCharacters)}...`
  }
  return item
}

const textSubString = item => {
  const maxCharacters = 70
  if (item.length > maxCharacters) {
    item = `${item.substring(0, maxCharacters)}...`
  }
  return item
}

const CanvasBlock = function(props) {
  const items = props.content.items.map(item => {
    return (
      <div className="canvas-card-container">
        <Card border="dark" className="canvas-item-card">
          <Card.Header className="canvas-item-header">{headerSubString(item.header)}</Card.Header>
          <Card.Body>
            <Card.Text>{textSubString(item.text)}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  })

  return (
    <Link to={`/editor/${props.content.className}`} className={`${props.content.className} block`}>
      <div>
        <div className="canvas-blocks-container">
          <div className="canvas-blocks canvas-block-header">{props.content.header}</div>
          <div className="canvas-blocks canvas-block-description">{props.content.description}</div>
        </div>
        <div className="canvas-blocks canvas-block-item">{items}</div>
      </div>
    </Link>
  )
}

export default CanvasBlock
