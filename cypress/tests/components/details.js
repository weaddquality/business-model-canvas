import React from 'react'
import 'cypress-react-unit-test'
import { StaticRouter } from 'react-router-dom'
import Details from '../../../src/components/details/Details'

describe('Component testing of Details', () => {
  it('renders a form with items and a "go back to canvas" link', () => {
    cy.mount(
      <StaticRouter>
        <Details />
      </StaticRouter>
    )
    cy.get('.details-form')
    cy.get('.details-list a')
      .its('length')
      .should('be.gt', 0)
    cy.contains(/go back to canvas/i)
  })
})
