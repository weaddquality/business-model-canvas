import React, { Component } from 'react'
import './Create.css'
import Form from 'react-bootstrap/Form'
import LoaderButton from '../loader-button/Loader-button'
import { API } from 'aws-amplify'
import uuid from 'uuid'

class Create extends Component {
  state = {
    isLoading: null,
    content: '',
  }

  validateForm() {
    return this.state.content.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      await this.createItem({
        content: this.state.content,
      })
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  createItem(input) {
    const canvasId = 'Team-Continuous'
    const blockName = 'value-proposition'
    return API.post('bmc-items', '/bmc-items', {
      body: {
        TableName: 'BusinessModelCanvas',
        Item: {
          CanvasBlock: `${canvasId}-${blockName}`,
          ItemId: uuid.v1(),
          CanvasId: canvasId,
          BlockName: blockName,
          Content: input.content,
        },
      },
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="create">
        <Form.Group controlId="content">
          <Form.Label>
            <b>Create a Value proposition</b>
          </Form.Label>
          <Form.Control
            as="input"
            rows="6"
            placeholder="Enter text here"
            onChange={this.handleChange}
            value={this.state.content}
          />
        </Form.Group>
        <LoaderButton
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Create"
          loadingText="Creating…"
        />
      </Form>
    )
  }
}

export default Create
