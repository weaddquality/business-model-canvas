import React, { useState, useEffect, Fragment } from 'react'
import './Details.css'
import { BLOCKS } from '../../constants/constants'
import { Link } from 'react-router-dom'
import { createItem } from '../../api/createItem'
import { updateItem } from '../../api/updateItem'
import { deleteItem } from '../../api/deleteItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function Details(props) {
  const [formMode, setFormMode] = useState('read')
  const [currentBlock, setCurrentBlock] = useState('')
  const [items, setItems] = useState([])
  const [card, setCard] = useState({
    blockUuid: '',
    header: '',
    text: '',
  })

  const handleAddItem = () => {
    setCard({ blockUuid: '', header: '', text: '' })
    setItems([...items, { BlockUuid: '', ItemHeader: '', ItemText: '' }])
    setMode('create')
  }

  const handleCreate = () => {
    createItem({
      team: props.selectedTeam.text,
      header: card.header,
      text: card.text,
      block: currentBlock,
    })
      .then(response => {
        setCard({ ...card, blockUuid: response.BlockUuid })
        setItems(
          items.map(item => {
            if (item.BlockUuid === '') {
              return {
                BlockUuid: response.BlockUuid,
                ItemHeader: card.header,
                ItemText: card.text,
              }
            }
            return item
          })
        )
        props.getCanvasData()
        setMode('read')
        // TODO: Make a better fix for this.
        // This solves an issue where block name is lost..
        // if the created item is the first one in the list
        if (props.match.params.blockUuid) {
          props.history.push(
            props.match.url.slice(0, props.match.url.lastIndexOf('/') + '/') + response.BlockUuid
          )
        } else {
          props.history.push(props.match.url + '/' + response.BlockUuid)
        }
      })
      .catch(e => {
        alert(e)
      })
  }

  const handleUpdate = () => {
    updateItem({
      team: props.selectedTeam.text,
      blockUuid: card.blockUuid,
      header: card.header,
      text: card.text,
    }).then(() => {
      setItems(
        items.map(item =>
          item.BlockUuid === card.blockUuid
            ? { BlockUuid: card.blockUuid, ItemHeader: card.header, ItemText: card.text }
            : item
        )
      )
      props.getCanvasData()
      setMode('read')
    })
  }

  const handleDelete = () => {
    deleteItem({ team: props.selectedTeam.text, blockUuid: card.blockUuid }).then(() => {
      const deletedIndex = items.findIndex(item => {
        return item.BlockUuid === card.blockUuid
      })
      const deletedItemHadNextItem = items[deletedIndex + 1]
      const deletedItemHadPreviousItem = items[deletedIndex - 1]
      setItems(items.filter(item => item.BlockUuid !== card.blockUuid))

      if (deletedItemHadNextItem) {
        props.history.push(
          props.match.url.slice(0, props.match.url.lastIndexOf('/') + '/') +
            items[deletedIndex + 1].BlockUuid
        )
      } else if (deletedItemHadPreviousItem) {
        props.history.push(
          props.match.url.slice(0, props.match.url.lastIndexOf('/') + '/') +
            items[deletedIndex - 1].BlockUuid
        )
      } else {
        props.history.push(props.match.url.slice(0, props.match.url.lastIndexOf('/')))
        setCard({ blockUuid: '', header: '', text: '' })
      }
      props.getCanvasData()
      setMode('read')
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
    if (formMode === 'create') {
      handleCreateCancel()
      return
    }
    setMode('read')
  }

  const handleCreateCancel = () => {
    setItems(items => {
      return items.filter(item => item.BlockUuid !== '')
    })
    const card = items.findIndex(item => {
      return item.BlockUuid === props.match.params.blockUuid
    })
    setCard({
      ...card,
      blockUuid: items[card].BlockUuid,
      header: items[card].ItemHeader,
      text: items[card].ItemText,
    })
    setMode('read')
  }

  const handleEditCancel = () => {
    const card = items.findIndex(item => {
      return item.BlockUuid === props.match.params.blockUuid
    })
    setCard({
      ...card,
      blockUuid: items[card].BlockUuid,
      header: items[card].ItemHeader,
      text: items[card].ItemText,
    })
    setMode('read')
  }

  const setMode = mode => {
    return setFormMode(mode)
  }

  useEffect(() => {
    // Set team if not already set and finish the useEffect
    if (props.selectedTeam.text === 'Select team...') {
      props.handleTeamChange({
        text: props.match.params.team.replace(/-/g, ' '),
        href: `/${props.match.params.team}/canvas`,
      })
      return
    }
    // Fetch canvas data if we don't already have it
    if (!props.listResponse) props.getCanvasData()
    // Only run this useEffect once.
  }, [props.selectedTeam])

  useEffect(() => {
    // Only do this if we have a ready listResponse
    if (props.listResponse) {
      // Set the current block and the list of items
      const matchedBlock = BLOCKS[props.match.params.blockType.replace('-', '_').toUpperCase()]
      setCurrentBlock(matchedBlock.name)
      setItems(props.listResponse[matchedBlock.name].items)
    }
    // Only run this useEffect if any of the below changes.
    // props.listResponse: is used when we don't have any api data on first render (i.e. via direct link to an item)
  }, [props.listResponse])

  useEffect(() => {
    // If we have any items, then set the card
    if (items.length > 0 && currentBlock !== '') {
      // If the url contains a blockUuid,
      // then try to find that item in the list of items
      if (props.match.params.blockUuid) {
        const card = items.findIndex(item => {
          return item.BlockUuid === props.match.params.blockUuid
        })
        // If the specified blockUuid is found in the list of items,
        // then set that card.
        if (card !== -1) {
          setCard({
            ...card,
            blockUuid: items[card].BlockUuid,
            header: items[card].ItemHeader,
            text: items[card].ItemText,
          })
          // otherwise redirect to our /404 route
          // E.g. if someone uses a direct url to a deleted item
        }
      }
      // If there's no blockUuid on the url,
      // then set the card with the first item in the list of items
      else {
        props.history.push(
          props.match.url + '/' + props.listResponse[currentBlock].items[0].BlockUuid
        )
        setCard({
          ...card,
          blockUuid: items[0].BlockUuid,
          header: items[0].ItemHeader,
          text: items[0].ItemText,
        })
      }
    }
    // Only run this useEffect if any of the below changes.
    // props.match.params.blockUuid: is used when the user changes the current selected item (the url will be updated with the blockUuid)
  }, [currentBlock, props.match.params.blockUuid, props.selectedTeam])

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
          <Button variant="success" onClick={() => setMode('write')}>
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
                  autoFocus
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows="15"
                  data-testid="details-updateform-text"
                  onChange={handleTextChange}
                  placeholder="Enter some details..."
                />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="details-cancel">
          <Button variant="secondary" onClick={handleCreateCancel}>
            Cancel
          </Button>
        </div>
        <div className="details-submit">
          <Button variant="success" onClick={handleCreate}>
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
          <Button variant="secondary" onClick={handleEditCancel}>
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
          className={item.BlockUuid === '' ? 'new-item' : null}
          active={card.blockUuid === item.BlockUuid}
          data-testid="details-list-item"
          key={item.BlockUuid}
          href={`${item.BlockUuid}`}
          onClick={handleItemChange}
        >
          {card.blockUuid === item.BlockUuid ? card.header : item.ItemHeader}
        </ListGroup.Item>
      )
    })

    return list.length > 0 ? (
      <div className="details-list" data-testid="details-list">
        <ListGroup>{list}</ListGroup>
      </div>
    ) : null
  }

  return (
    <div id="details">
      <div className="details-container">
        <div className="details-form">
          <div className="details-block">{currentBlock}</div>
          {formMode === 'read' ? (
            <div className="details-create">
              <Button className="create-button" variant="dark" onClick={handleAddItem}>
                Add Item
              </Button>
            </div>
          ) : null}
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
