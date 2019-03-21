import React, { useState, Fragment } from 'react'
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

  const form = () => {
    if (writeMode) {
      return (
        <Fragment>
          <div className="details-card">
            <div className="details-card-container">
              <Form className="details-card-write">
                <Form.Group>
                  <Form.Control placeholder="Header" />
                </Form.Group>
                <Form.Group>
                  <Form.Control as="textarea" rows="15" placeholder="This is where the text goes" />
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
            <div className="details-card-read-header">Header</div>
            <div className="details-card-read-text">This is where the text goes</div>
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
          <div className="details-block">Value Propositions</div>
          <div className="details-edit">
            <i className="fa fa-edit" onClick={handleMode} />
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
