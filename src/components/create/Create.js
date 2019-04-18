import React, { useState } from 'react'
import './Create.css'
import * as Constant from '../../constants/constants'
import Form from 'react-bootstrap/Form'
import LoadingButton from '../loading-button/Loading-button'
import { withRouter } from 'react-router-dom'
import { createItem } from '../../api/createItem'

const Create = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [header, setHeader] = useState('')
  const [text, setText] = useState('')

  const validateForm = () => {
    return text.length > 0
  }

  const handleHeaderChange = event => {
    setHeader(event.target.value)
  }

  const handleTextChange = event => {
    setText(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    try {
      await createItem({
        header: header,
        text: text,
      })
      props.history.push('/')
    } catch (e) {
      alert(e)
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="create">
      <Form.Group controlId="content">
        <Form.Label>
          <b>{Constant.CREATE_VALUE_PROPOSITIONS}</b>
        </Form.Label>
        <Form.Control
          as="input"
          rows="1"
          placeholder="Enter header here"
          onChange={handleHeaderChange}
          value={header}
          data-testid="createItemInputHeader"
        />
        <Form.Control
          as="input"
          rows="6"
          placeholder="Enter text here"
          onChange={handleTextChange}
          value={text}
          data-testid="createItemInputText"
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
