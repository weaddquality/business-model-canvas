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
      TableName: 'BusinessModelCanvas',
      Team: 'Team Continuous',
      Block: 'Value Propositions',
      BlockDescription: 'What value do we deliver to the customer',
      ItemHeader: 'Value props header',
      ItemText: input.content,
    }

    return API.post('bmc-items', 'bmc-items/create', {
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
