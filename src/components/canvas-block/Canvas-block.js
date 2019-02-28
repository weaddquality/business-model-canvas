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

const logme = props => {
  console.log(props.content.items)
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
            <Card.Text>{textSubString(item.itemText)}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  })

  return (
    <div>
      <div>{logme(props)}</div>
      {/* // <Link to={`/editor/${props.content.className}`} className={`${props.content.className} block`}> */}
      <Link to="/editor/key-partners" className="key-partners block">
        <div>
          <div className="canvas-blocks-container">
            {/* <div className="canvas-blocks canvas-block-header">{props.content.items[0].blockHeader}</div> 
          <div className="canvas-blocks canvas-block-description">{props.content.items[0].blockDescription}</div> */}
          </div>
          <div className="canvas-blocks canvas-block-item">{items}</div>
        </div>
      </Link>
    </div>
  )
}

export default CanvasBlock
