import React, { useState } from 'react'
import './Signup.css'
import logo from '../../images/addq-logo.png'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import LoadingButton from '../loading-button/Loading-button'
import { withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'

export const validateForm = (email, password, confirmPassword) => {
  const emailSuffix = '@addq.se'
  return (
    email.length > 0 &&
    email.length > emailSuffix.length &&
    email.endsWith(emailSuffix) &&
    password.length > 0 &&
    password === confirmPassword
  )
}

const Signup = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [newUser, setNewUser] = useState(null)

  const validateConfirmationForm = () => {
    return confirmationCode.length > 0
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }
  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value)
  }
  const handleConfirmationCodeChange = event => {
    setConfirmationCode(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
      })
      setNewUser(newUser)
    } catch (e) {
      alert(e.message)
    }

    setIsLoading(false)
  }

  const handleConfirmationSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    try {
      await Auth.confirmSignUp(email, confirmationCode)
      await Auth.signIn(email, password)

      props.userHasAuthenticated(true)
      props.history.push('/')
    } catch (e) {
      alert(e.message)
      setIsLoading(false)
    }
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl autoFocus type="email" value={email} onChange={handleEmailChange} />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl value={password} onChange={handlePasswordChange} type="password" />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            type="password"
          />
        </FormGroup>
        <LoadingButton
          block
          disabled={!validateForm(email, password, confirmPassword)}
          type="submit"
          isLoading={isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    )
  }

  const renderConfirmationForm = () => {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode">
          <FormLabel>Confirmation Code</FormLabel>
          <FormControl
            autoFocus
            type="tel"
            value={confirmationCode}
            onChange={handleConfirmationCodeChange}
          />
          <Form.Text className="text-muted">
            Please check your email for the code,
            <br /> including your "Spam" folder.
          </Form.Text>
        </FormGroup>
        <LoadingButton
          block
          disabled={!validateConfirmationForm()}
          type="submit"
          isLoading={isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    )
  }

  return (
    <div className="signup-container">
      <img src={logo} alt="" />
      <div className="signup-header">Business Model Canvas</div>
      <div className="signup">{newUser === null ? renderForm() : renderConfirmationForm()}</div>
    </div>
  )
}

export default withRouter(Signup)
