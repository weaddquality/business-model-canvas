import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup, Button } from 'react-bootstrap'

const OptionBar = () => {
  return (
    <div>
      <div className="View">
        <ButtonGroup>
          <Link to="/item/create">
            <Button variant="outline-secondary" size="sm">
              Create item
            </Button>
          </Link>
          <Link to="/canvas">
            <Button variant="outline-secondary" size="sm">
              Canvas
            </Button>
          </Link>
          <Link to="/horizontal">
            <Button variant="outline-secondary" size="sm">
              Horizontal
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default OptionBar
