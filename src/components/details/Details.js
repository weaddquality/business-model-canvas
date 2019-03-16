import React from 'react'
import './Details.css'
import { Link } from 'react-router-dom'

export default function Details() {
  return (
    <div>
      <div className="details-block">Value Propositions</div>
      <div className="details-form">
        <div className="details-header">Header here</div>
        <div className="details-text">This is where the text goes</div>
        <div className="details-cancel">Cancel-button</div>
        <div className="details-submit">Submit-button</div>
        <div className="details-list">
          <div className="details-list-item">item1</div>
          <div className="details-list-item">item2</div>
          <div className="details-list-item">item3</div>
        </div>
      </div>
      <Link to="/canvas">Go back to Canvas</Link>
    </div>
  )
}
