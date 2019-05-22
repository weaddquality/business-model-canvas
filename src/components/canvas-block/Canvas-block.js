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
  const items = Object.entries(props.blockData.items).map(item => {
    const blockUuid = item[0]
    const itemData = item[1]

    return (
      <div className="canvas-card-container" key={`${blockUuid}`}>
        <Card border="dark" className="canvas-item-card">
          <Card.Header className="canvas-item-header">
            {headerText(itemData.ItemHeader)}
          </Card.Header>
          <Card.Body>
            <Card.Text>{itemText(itemData.ItemText)}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  })

  return (
    <Link
      id="canvas-block"
      to={`/details/${props.blockData.blockInKebabCase}`}
      className={`${props.blockData.blockInKebabCase} block`}
    >
      <div className="canvas-blocks-container">
        <div className="canvas-blocks canvas-block-header">{props.blockName}</div>
        <div className="canvas-blocks canvas-block-description">
          {props.blockData.blockDescription}
        </div>
      </div>
      <div className="canvas-blocks canvas-block-item">{items}</div>
    </Link>
  )
}

export default CanvasBlock
