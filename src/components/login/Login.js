import React, { Component } from 'react'
import './Login.css'
import logo from '../../images/addq-logo.png'
import LoadingButton from '../loading-button/Loading-button'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import { Auth } from 'aws-amplify'

class Login extends Component {
  state = {
    isLoading: false,
    email: '',
    password: '',
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
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
      await Auth.signIn(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)
      this.props.history.push('/')
    } catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <div className="login-container">
        <img src={logo} alt="" />
        <div className="login-header">Business Model Canvas</div>
        <div className="login">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <LoadingButton
              block
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Login"
              loadingText="Logging in…"
            />
          </Form>
        </div>
      </div>
    )
  }
}

export default Login
