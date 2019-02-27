import React, { Component } from 'react'
import './Create.css'
import Form from 'react-bootstrap/Form'
import LoadingButton from '../loading-button/Loading-button'
import { API } from 'aws-amplify'

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
    const item = {
      tableName: 'BusinessModelCanvas',
      teamName: 'Team-Continuous',
      blockHeader: 'Value Propositions',
      blockDescription: 'What value do we deliver to the customer',
      itemHeader: 'Value props header',
      itemText: input.content,
    }

    return API.post('bmc-items', '/bmc-items', {
      body: {
        TableName: item.tableName,
        Item: {
          TeamNameBlockHeader: `${item.teamName}-${item.blockHeader}`,
          TeamName: item.teamName,
          BlockHeader: item.blockHeader,
          BlockDescription: item.blockDescription,
          ItemHeader: item.itemHeader,
          ItemText: item.itemText,
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
        <LoadingButton
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
