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

const formatBlockHeader = headerText => {
  return headerText.toLowerCase().replace(' ', '-')
}

const CanvasBlock = props => {
  const items = props.content.items.map(item => {
    return (
      <div className="canvas-card-container">
        <Card border="dark" className="canvas-item-card">
          <Card.Header className="canvas-item-header">
            {headerSubString(item.itemHeader)}
          </Card.Header>
          <Card.Body>
            <Card.Text>{textSubString(item.ItemText)}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  })

  return (
    <Link
      to={`/editor/${formatBlockHeader(props.content.block)}`}
      className={`${formatBlockHeader(props.content.block)} block`}
    >
      <div className="canvas-blocks-container">
        <div className="canvas-blocks canvas-block-header">{props.content.block}</div>
        <div className="canvas-blocks canvas-block-description">
          {props.content.blockDescription}
        </div>
      </div>
      <div className="canvas-blocks canvas-block-item">{items}</div>
    </Link>
  )
}

export default CanvasBlock
