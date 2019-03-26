import React, { useState, useEffect, Fragment } from 'react'
import './Details.css'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function Details(props) {
  const [writeMode, setWriteMode] = useState(false)
  const [currentBlock, setCurrentBlock] = useState({
    block: '',
    blockDescription: '',
    items: [{ itemHeader: '', ItemText: '' }],
  })

  useEffect(() => {
    const currentBlockFromUrl = props.listResponse.find(block => {
      return block.block.replace(' ', '-').toLowerCase() === props.match.params.blockType
    })
    setCurrentBlock(currentBlockFromUrl)
  }, [])

  const form = () => {
    if (writeMode) {
      return (
        <Fragment>
          <div className="details-card">
            <div className="details-card-container">
              <Form className="details-card-write">
                <Form.Group>
                  <Form.Control defaultValue={currentBlock.items[0].itemHeader} />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows="15"
                    defaultValue={currentBlock.items[0].ItemText}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="details-delete">
            <Button variant="danger">Delete</Button>
          </div>
          <div className="details-cancel">
            <Button variant="secondary">Cancel</Button>
          </div>
          <div className="details-submit">
            <Button variant="success">Submit</Button>
          </div>
        </Fragment>
      )
    } else {
      return (
        <div className="details-card">
          <div className="details-card-container">
            <div className="details-card-read-header">{currentBlock.items[0].itemHeader}</div>
            <div className="details-card-read-text">{currentBlock.items[0].ItemText}</div>
          </div>
          <div className="details-submit">
            <Button variant="success">Edit</Button>
          </div>
        </div>
      )
    }
  }

  const listItems = () => {
    return (
      <div className="details-list">
        <ListGroup>
          <ListGroup.Item action href="/0109ad10-4783-11e9-824b-1fca161f126b">
            Item 1
          </ListGroup.Item>
          <ListGroup.Item action href="/014a62c0-4787-11e9-824b-1fca161f126b">
            Item 2
          </ListGroup.Item>
          <ListGroup.Item action href="/05a4ae70-4782-11e9-824b-1fca161f126b">
            Item 3
          </ListGroup.Item>
        </ListGroup>
      </div>
    )
  }

  return (
    <div>
      <div className="details-container">
        <div className="details-form">
          <div className="details-block">{currentBlock.block}</div>
          <div className="details-edit">
            <i
              className="fa fa-edit"
              onClick={() => {
                setWriteMode(!writeMode)
              }}
            />
          </div>
          <div className="details-create">
            <Link to="/item/create" data-testid="createItemButton">
              <i className="fa fa-plus details-create" /> Create item
            </Link>
          </div>
          {form()}
          {listItems()}
        </div>
        <Link to="/canvas" data-testid="goBackToCanvasButton">
          Go back to Canvas
        </Link>
      </div>
    </div>
  )
}
