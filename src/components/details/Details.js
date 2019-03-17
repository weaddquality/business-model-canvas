import React from 'react'
import './Details.css'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export default function Details() {
  return (
    <div>
      <div className="details-container">
        <div className="details-form">
          <div className="details-block">Value Propositions</div>
          <div className="details-create-team">
            <Link to="/item/create">
              <i className="fa fa-plus details-create-team" /> Create item
            </Link>
          </div>
          <div className="details-header">Header here</div>
          <div className="details-text">This is where the text goes</div>
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
        <Link to="/canvas">Go back to Canvas</Link>
      </div>
    </div>
  )
}
