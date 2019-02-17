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
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="fa fa-refresh spinning" />}
      {!isLoading ? text : loadingText}
    </Button>
  )
}

export default LoadingButton
