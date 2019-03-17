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

  it('renders a link/text as "go back to canvas"', () => {
    cy.get('[data-testid="goBackToCanvasButton"]').then(element => {
      expect(element.text()).equals('Go back to Canvas')
    })
  })

  it('renders a link to canvas', () => {
    cy.get('[data-testid="goBackToCanvasButton"]').then(href => {
      expect(href[0].pathname).equals('/canvas')
    })
  })

  it('renders a create-item link', () => {
    cy.get('[data-testid="createItemButton"]').then(element => {
      expect(element[0].pathname).equals('/item/create')
    })
  })
})
