import React, { useState, useEffect, Fragment } from 'react'
import './Details.css'
import { Link } from 'react-router-dom'
import { updateItem } from '../../api/updateItem'
import { deleteItem } from '../../api/deleteItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function Details(props) {
  const [writeMode, setWriteMode] = useState(false)
  const [currentBlock, setCurrentBlock] = useState('')
  const [card, setCard] = useState({
    blockUuid: '',
    header: '',
    text: '',
  })

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
    const selectedItemBlockUuid = href.slice(href.lastIndexOf('/') + 1)
    const currentBlock = getCurrentBlock()
    const card = currentBlock.items.findIndex(item => {
      return item.BlockUuid === selectedItemBlockUuid
    })
    setCard({
      blockUuid: currentBlock.items[card].BlockUuid,
      header: currentBlock.items[card].ItemHeader,
      text: currentBlock.items[card].ItemText,
    })
    setWriteMode(false)
  }

  const getCurrentBlock = () => {
    const emptyBlock = {
      block: '',
      blockDescription: '',
      items: [{ BlockUuid: '', ItemHeader: '', ItemText: '' }],
    }

    // const foundBlock = props.listResponse.find(({ block }) => {
    //   const blockKebabCased = block.replace(' ', '-').toLowerCase()
    //   return blockKebabCased === props.match.params.blockType
    // })

    const foundBlock = props.listResponse[props.location.state.blockId]

    if (!foundBlock) {
      return emptyBlock
    }

    if (foundBlock.items.length === 0) {
      foundBlock.items = [{ BlockUuid: '', ItemHeader: '', ItemText: '' }]
    }
    return foundBlock ? foundBlock : emptyBlock
  }

  useEffect(() => {
    if (props.listResponse.length === 0) props.getCanvasData()
  }, [])

  useEffect(() => {
    const currentBlock = getCurrentBlock()
    if (props.match.url.includes(currentBlock.block)) {
      const selectedItemBlockUuid = props.match.url.slice(props.match.url.lastIndexOf('/') + 1)
      const card = currentBlock.items.findIndex(item => {
        return item.BlockUuid === selectedItemBlockUuid
      })

      if (card === -1) {
        setCard({
          ...card,
          blockUuid: currentBlock.items[0].BlockUuid,
          header: currentBlock.items[0].ItemHeader,
          text: currentBlock.items[0].ItemText,
        })
      } else {
        setCard({
          ...card,
          blockUuid: currentBlock.items[card].BlockUuid,
          header: currentBlock.items[card].ItemHeader,
          text: currentBlock.items[card].ItemText,
        })
      }
    } else {
      props.history.push(props.match.url + '/' + currentBlock.items[0].BlockUuid)
      setCard({
        ...card,
        blockUuid: currentBlock.items[0].BlockUuid,
        header: currentBlock.items[0].ItemHeader,
        text: currentBlock.items[0].ItemText,
      })
    }
  }, [
    getCurrentBlock().items[0].ItemHeader,
    getCurrentBlock().items[0].ItemText,
    getCurrentBlock().items.length,
  ])

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
    } else if (getCurrentBlock().items[0] !== undefined) {
      return (
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
    } else {
      return (
        <div className="details-card" data-testid="details-readmode">
          <div className="details-card-container">
            <div className="details-card-read-header" />
            <div className="details-card-read-text" data-testid="details-readform-text" />
          </div>
        </div>
      )
    }
  }

  const listItems = () => {
    const block = getCurrentBlock()
    const list = block.items.map(item => {
      return (
        <ListGroup.Item
          action
          active={card.blockUuid === item.BlockUuid}
          data-testid="details-list-item"
          key={item.BlockUuid}
          href={`/details/${block.kebabCase}/${item.BlockUuid}`}
          onClick={handleItemChange}
        >
          {item.ItemHeader}
        </ListGroup.Item>
      )
    })

    if (block.items[0] !== undefined) {
      return (
        <div className="details-list" data-testid="details-list">
          <ListGroup>{list}</ListGroup>
        </div>
      )
    }
  }

  return (
    <div id="details">
      <div className="details-container">
        <div className="details-form">
          <div className="details-block">{getCurrentBlock().block}</div>
          <div className="details-create">
            <Link to="/item/create" data-testid="createItemButton">
              <i className="fa fa-plus" /> Create item
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
