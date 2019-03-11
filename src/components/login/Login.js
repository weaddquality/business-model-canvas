import React, { useState } from 'react'
import './Login.css'
import logo from '../../images/addq-logo.png'
import LoadingButton from '../loading-button/Loading-button'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import { withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const Login = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const validateForm = () => {
    return email.length > 0 && password.length > 0
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    try {
      await Auth.signIn(email, password)
      props.userHasAuthenticated(true)
      props.history.push('/')
    } catch (e) {
      alert(e.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <img src={logo} alt="" />
      <div className="login-header">Business Model Canvas</div>
      <div className="login">
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl autoFocus type="email" value={email} onChange={handleEmailChange} />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl value={password} onChange={handlePasswordChange} type="password" />
          </FormGroup>
          <LoadingButton
            block
            disabled={!validateForm()}
            type="submit"
            isLoading={isLoading}
            text="Login"
            loadingText="Logging in…"
            data-testid="loginSubmitButton"
          />
        </Form>
      </div>
    </div>
  )
}

export default withRouter(Login)
