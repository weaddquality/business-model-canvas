import React from 'react'
import './Loading-button.css'
import Button from 'react-bootstrap/Button'

const LoadingButton = ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <Button
      variant="secondary"
      className={`loaderButton ${className}`}
      data-testid="submitButton"
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <i className="fa fa-refresh spinning" />}
      {!isLoading ? text : loadingText}
    </Button>
  )
}

export default LoadingButton
