import React, { useState } from 'react'
import './Details.css'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function Details() {
  const [writeMode, setWriteMode] = useState(false)

  const handleMode = () => {
    setWriteMode(!writeMode)
  }

  const card = () => {
    if (writeMode) {
      return (
        <div>
          <Form>
            <Form.Group>
              <Form.Control placeholder="Header" />
            </Form.Group>
            <Form.Group>
              <Form.Control as="textarea" rows="15" placeholder="Text" />
            </Form.Group>
          </Form>
        </div>
      )
    } else {
      return (
        <div>
          <div className="details-header">Header here</div>
          <div className="details-text">This is where the text goes</div>
        </div>
      )
    }
  }
  return (
    <div>
      <div className="details-container">
        <div className="details-form">
          <div className="details-block">Value Propositions</div>
          <div className="details-edit">
            <i className="fa fa-edit" onClick={handleMode} />
          </div>
          <div className="details-create">
            <Link to="/item/create" data-testid="createItemButton">
              <i className="fa fa-plus details-create" /> Create item
            </Link>
          </div>
          <div className="details-card">{card()}</div>
          <div className="details-delete">
            <Button variant="danger">Delete</Button>
          </div>
          <div className="details-cancel">
            <Button variant="secondary">Cancel</Button>
          </div>
          <div className="details-submit">
            <Button variant="success">Submit</Button>
          </div>
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
        </div>
        <Link to="/canvas" data-testid="goBackToCanvasButton">
          Go back to Canvas
        </Link>
      </div>
    </div>
  )
}
