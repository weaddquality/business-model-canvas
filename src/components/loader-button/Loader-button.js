import React from 'react'
import './Loader-button.css'
import Button from 'react-bootstrap/Button'
// import { Button, Glyphicon } from 'react-bootstrap' // no support in react-bootstrap 1.0.0-beta5

export default ({ isLoading, text, loadingText, className = '', disabled = false, ...props }) => (
  <Button
    variant="secondary"
    className={`loaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {/* {isLoading && <Glyphicon glyph="refresh" className="spinning" />} // no support in react-bootstrap 1.0.0-beta5 */}
    {!isLoading ? text : loadingText}
  </Button>
)
