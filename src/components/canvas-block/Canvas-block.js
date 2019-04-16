import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import './Canvas-block.css'

const substring = (text, maxCharacters) => {
  if (text && text.length > maxCharacters) {
    text = `${text.substring(0, maxCharacters)}...`
  }
  return text
}

export const headerText = text => {
  const maxCharacters = 34
  return substring(text, maxCharacters)
}

export const itemText = text => {
  const maxCharacters = 70
  return substring(text, maxCharacters)
}

export const formatBlockHeader = headerText => {
  return headerText.toLowerCase().replace(' ', '-')
}

const CanvasBlock = props => {
  const items = props.content.items.map((item, index) => {
    return (
      <div className="canvas-card-container" key={`${index}-${item.ItemHeader}`}>
        <Card border="dark" className="canvas-item-card">
          <Card.Header className="canvas-item-header">{headerText(item.ItemHeader)}</Card.Header>
          <Card.Body>
            <Card.Text>{itemText(item.ItemText)}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  })

  return (
    <Link
      id="canvas-block"
      to={`/details/${formatBlockHeader(props.content.block)}`}
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
