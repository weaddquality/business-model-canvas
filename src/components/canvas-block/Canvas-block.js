import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import './Canvas-block.css'

const substring = (text, maxCharacters) => {
  if (text.length > maxCharacters) {
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
      <div className="canvas-card-container" key={`${index}-${item.itemHeader}`}>
        <Card border="dark" className="canvas-item-card">
          <Card.Header className="canvas-item-header">{headerText(item.itemHeader)}</Card.Header>
          <Card.Body>
            <Card.Text>{itemText(item.ItemText)}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  })

  // To be able to run the unit test:
  // '../../../cypress/tests/components/canvas-block':
  //
  // I needed to change <Link> to a simple <a> tag due to the following error:
  // "Invariant Violation: You should not use <Link> outside a <Router>"
  // I guess this error occurs because we don't have any React Router...
  // ... in the context of the canvas-block test

  return (
    <a
      href={`/editor/${formatBlockHeader(props.content.block)}`}
      className={`${formatBlockHeader(props.content.block)} block`}
    >
      <div className="canvas-blocks-container">
        <div className="canvas-blocks canvas-block-header">{props.content.block}</div>
        <div className="canvas-blocks canvas-block-description">
          {props.content.blockDescription}
        </div>
      </div>
      <div className="canvas-blocks canvas-block-item">{items}</div>
    </a>
  )
}

export default CanvasBlock
