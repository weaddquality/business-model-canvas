import React, { useState } from 'react'
import './Create.css'
import Form from 'react-bootstrap/Form'
import LoadingButton from '../loading-button/Loading-button'
import { withRouter } from 'react-router-dom'
import { API } from 'aws-amplify'

const Create = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')

  const validateForm = () => {
    return content.length > 0
  }

  const handleChange = event => {
    setContent(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    try {
      await createItem({
        content: content,
      })
      props.history.push('/')
    } catch (e) {
      alert(e)
      setIsLoading(false)
    }
  }

  const createItem = input => {
    const item = {
      TableName: 'BusinessModelCanvas',
      Team: 'Team Continuous',
      Block: 'Value Propositions',
      BlockDescription: 'What value do we deliver to the customer',
      ItemHeader: 'Value props header',
      ItemText: input.content,
    }

    return API.post('bmc-items', '/bmc-items/create', {
      body: {
        TableName: item.TableName,
        Item: {
          Team: item.Team,
          Block: item.Block,
          BlockDescription: item.BlockDescription,
          ItemHeader: item.ItemHeader,
          ItemText: item.ItemText,
        },
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit} className="create">
      <Form.Group controlId="content">
        <Form.Label>
          <b>Create a Value proposition</b>
        </Form.Label>
        <Form.Control
          as="input"
          rows="6"
          placeholder="Enter text here"
          onChange={handleChange}
          value={content}
        />
      </Form.Group>
      <LoadingButton
        disabled={!validateForm()}
        type="submit"
        isLoading={isLoading}
        text="Create"
        loadingText="Creating…"
      />
    </Form>
  )
}

export default withRouter(Create)
