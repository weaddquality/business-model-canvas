import React from 'react'
import 'cypress-react-unit-test'
import { StaticRouter } from 'react-router-dom'
import Details from '../../../src/components/details/Details'

describe('Component testing of Details', () => {
  beforeEach(() => {
    cy.mount(
      <StaticRouter>
        <Details />
      </StaticRouter>
    )
  })

  it('renders a form for css-grid', () => {
    cy.get('.details-form')
  })

  it('renders a block', () => {
    cy.contains('Value Propositions')
  })

  it('renders a header', () => {
    cy.contains('Header here')
  })

  it('renders a text', () => {
    cy.contains('This is where the text goes')
  })

  it('renders a items-list', () => {
    cy.get('.details-list a')
      .its('length')
      .should('be.gt', 0)
  })

  it('renders a "go back to canvas"-link', () => {
    cy.contains(/go back to canvas/i).then(element => {
      expect(element[0].pathname).equals('/canvas')
    })
  })
})
