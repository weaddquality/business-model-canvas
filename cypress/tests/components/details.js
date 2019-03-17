import React from 'react'
import 'cypress-react-unit-test'
import { StaticRouter } from 'react-router-dom'
import Details from '../../../src/components/details/Details'

describe('Component testing of Details', () => {
  beforeEach(function() {
    cy.mount(
      <StaticRouter>
        <Details />
      </StaticRouter>
    )
  })

  //TODO: Can we test this without using a css selector?
  it('renders a list of items', () => {
    cy.get('.details-list a')
      .its('length')
      .should('be.gt', 0)
  })

  it('renders a "go back to canvas link"', () => {
    cy.contains(/go back to canvas/i)
  })
})
