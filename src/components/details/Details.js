import React, { useState, useEffect, Fragment } from 'react'
import './Details.css'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function Details(props) {
  const [writeMode, setWriteMode] = useState(false)
  useEffect(() => {
    if (props.listResponse.length === 0) props.getCanvasData()
  }, [])

  const getCurrentBlockFromUrl = () => {
    const emptyBlock = {
      block: '',
      blockDescription: '',
      items: [{ itemHeader: '', ItemText: '' }],
    }

    const foundBlock = props.listResponse.find(({ block }) => {
      const blockKebabCased = block.replace(' ', '-').toLowerCase()
      return blockKebabCased === props.match.params.blockType
    })
    return foundBlock ? foundBlock : emptyBlock
  }

  const toggleMode = () => {
    setWriteMode(!writeMode)
  }

  const form = () => {
    if (writeMode) {
      return (
        <Fragment>
          <div className="details-card" data-testid="details-writemode">
            <div className="details-card-container">
              <Form className="details-card-write">
                <Form.Group>
                  <Form.Control defaultValue={getCurrentBlockFromUrl().items[0].ItemHeader} />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows="15"
                    defaultValue={getCurrentBlockFromUrl().items[0].ItemText}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="details-delete">
            <Button variant="danger">Delete</Button>
          </div>
          <div className="details-cancel">
            <Button variant="secondary" onClick={toggleMode}>
              Cancel
            </Button>
          </div>
          <div className="details-submit">
            <Button variant="success">Submit</Button>
          </div>
        </Fragment>
      )
    } else {
      return (
        <div className="details-card" data-testid="details-readmode">
          <div className="details-card-container">
            <div className="details-card-read-header">
              {getCurrentBlockFromUrl().items[0].ItemHeader}
            </div>
            <div className="details-card-read-text">
              {getCurrentBlockFromUrl().items[0].ItemText}
            </div>
          </div>
          <div className="details-submit">
            <Button variant="success" onClick={toggleMode}>
              Edit
            </Button>
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
          <div className="details-block">{getCurrentBlockFromUrl().block}</div>
          <div className="details-edit">
            <i className="fa fa-edit" onClick={toggleMode} />
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
