import React, { useState, useEffect, Fragment } from 'react'
import './Details.css'
import { BLOCKS } from '../../constants/constants'
import { Link } from 'react-router-dom'
import { updateItem } from '../../api/updateItem'
import { deleteItem } from '../../api/deleteItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function Details(props) {
  const [formMode, setFormMode] = useState('read')
  const [currentBlock, setCurrentBlock] = useState('')
  const [items, setItems] = useState([{ BlockUuid: '', ItemHeader: '', ItemText: '' }])
  const [card, setCard] = useState({
    blockUuid: '',
    header: '',
    text: '',
  })

  const handleCreate = () => {
    setItems([...items, { BlockUuid: '', ItemHeader: '', ItemText: '' }])
    toggleCreateMode()
  }

  const handleUpdate = () => {
    updateItem({ blockUuid: card.blockUuid, header: card.header, text: card.text }).then(() => {
      props.getCanvasData()
      toggleMode()
    })
  }

  const handleDelete = () => {
    deleteItem(card.blockUuid).then(() => {
      props.getCanvasData()
      toggleMode()
      props.history.push(props.match.url.slice(0, props.match.url.lastIndexOf('/')))
    })
  }

  const handleHeaderChange = event => {
    setCard({ ...card, header: event.target.value })
  }

  const handleTextChange = event => {
    setCard({ ...card, text: event.target.value })
  }

  const handleItemChange = event => {
    event.preventDefault()
    const href = event.target.getAttribute('href')
    props.history.push(href)
    setFormMode('read')
  }

  const toggleMode = () => {
    return formMode === 'read' ? setFormMode('write') : setFormMode('read')
  }

  const toggleCreateMode = () => {
    setFormMode('create')
  }

  useEffect(() => {
    if (!props.listResponse) props.getCanvasData()
  }, [])

  useEffect(() => {
    // Only run this if we have a ready listResponse
    if (props.listResponse) {
      const matchedBlock = BLOCKS[props.match.params.blockType.replace('-', '_').toUpperCase()]
      setCurrentBlock(matchedBlock.name)
      setItems(props.listResponse[matchedBlock.name].items)
      if (props.match.params.blockUuid) {
        const card = items.findIndex(item => {
          return item.BlockUuid === props.match.params.blockUuid
        })

        if (card === -1) {
          setCard({
            ...card,
            blockUuid: items[0].BlockUuid,
            header: items[0].ItemHeader,
            text: items[0].ItemText,
          })
        } else {
          setCard({
            ...card,
            blockUuid: items[card].BlockUuid,
            header: items[card].ItemHeader,
            text: items[card].ItemText,
          })
        }
      } else {
        if (props.listResponse[matchedBlock.name].items[0].BlockUuid !== '') {
          props.history.push(
            props.match.url + '/' + props.listResponse[matchedBlock.name].items[0].BlockUuid
          )
        }
        setCard({
          ...card,
          blockUuid: items[0].BlockUuid,
          header: items[0].ItemHeader,
          text: items[0].ItemText,
        })
      }
    }
    // Only run this useEffect if any of the below changes
  }, [props.listResponse, items[0].ItemHeader, items[0].ItemText, props.match.params.blockUuid])

  const form = () => {
    const readForm = (
      <div className="details-card" data-testid="details-readmode">
        <div className="details-card-container">
          <div className="details-card-read-header" data-testid="details-readform-header">
            {card.header}
          </div>
          <div className="details-card-read-text" data-testid="details-readform-text">
            {card.text}
          </div>
        </div>
        <div className="details-submit">
          <Button variant="success" onClick={toggleMode}>
            Edit
          </Button>
        </div>
      </div>
    )

    const createForm = (
      <Fragment>
        <div className="details-card" data-testid="details-writemode">
          <div className="details-card-container">
            <Form className="details-card-write">
              <Form.Group>
                <Form.Control
                  data-testid="details-updateform-header"
                  onChange={handleHeaderChange}
                  placeholder="Enter a header..."
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows="15"
                  autoFocus
                  data-testid="details-updateform-text"
                  onChange={handleTextChange}
                  placeholder="Enter some details..."
                />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="details-cancel">
          <Button variant="secondary" onClick={toggleCreateMode}>
            Cancel
          </Button>
        </div>
        <div className="details-submit">
          <Button variant="success" onClick={handleUpdate}>
            Create
          </Button>
        </div>
      </Fragment>
    )

    const writeForm = (
      <Fragment>
        <div className="details-card" data-testid="details-writemode">
          <div className="details-card-container">
            <Form className="details-card-write">
              <Form.Group>
                <Form.Control
                  data-testid="details-updateform-header"
                  onChange={handleHeaderChange}
                  defaultValue={card.header}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows="15"
                  autoFocus
                  data-testid="details-updateform-text"
                  onChange={handleTextChange}
                  defaultValue={card.text}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="details-delete">
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
        <div className="details-cancel">
          <Button variant="secondary" onClick={toggleMode}>
            Cancel
          </Button>
        </div>
        <div className="details-submit">
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </Fragment>
    )

    switch (formMode) {
      case 'read':
        return readForm
      case 'write':
        return writeForm
      case 'create':
        return createForm
      default:
        return readForm
    }
  }

  const listItems = () => {
    const list = items.map(item => {
      return (
        <ListGroup.Item
          action
          active={card.blockUuid === item.BlockUuid}
          data-testid="details-list-item"
          key={item.BlockUuid}
          href={`${item.BlockUuid}`}
          onClick={handleItemChange}
        >
          {item.ItemHeader}
        </ListGroup.Item>
      )
    })

    return (
      <div className="details-list" data-testid="details-list">
        <ListGroup>{list}</ListGroup>
      </div>
    )
  }

  return (
    <div id="details">
      <div className="details-container">
        <div className="details-form">
          <div className="details-block">{currentBlock}</div>
          <div className="details-create">
            <Button className="create-button" variant="dark" onClick={handleCreate}>
              Add Item
            </Button>
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
