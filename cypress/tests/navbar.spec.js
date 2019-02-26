import { XRay } from 'aws-sdk/clients/all'

describe('Testing the navbar', function() {
  beforeEach(function() {
    cy.visit('/')
    cy.login()
    cy.visit('/notfound')
    cy.contains('404')
  })

  after(function() {
    cy.logout()
  })

  it('the home-button', function() {
    cy.getByText('Business Model Canvas').click()
  })

  it('the dropdown', function() {
    cy.getByText('Team Continuous').click()
    cy.contains('Key Partners')
  })

  it('the splitbutton-arrow on dropdown', function() {
    cy.get('[data-testid="navbarDropdownSplitButton"]').click()
    cy.contains('Key Partners')
  })

  it('the splitbutton-arrow on dropdowns submenu OK', function() {
    cy.get('[data-testid="navbarDropdownSubmenuToggle"]').click()
    cy.get('[data-testid="navbarDropdownSubmenu"] > a')
      .first()
      .click()
    cy.contains('Value Proposition')
  })

  it('the splitbutton-arrow on dropdowns submenu NOK 404', function() {
    cy.get('[data-testid="navbarDropdownSubmenuToggle"]').click()
    cy.getByText('Team Frontend Auto').click()
    cy.contains('404')
  })

  it('the create button', function() {
    cy.getByText('Create item').click()
    cy.contains('Create a Value proposition')
  })

  it('the view toggle', function() {
    cy.get('[data-testid="viewToggleButton"]').click()
    cy.url().should('include', '/horizontal')
    cy.contains('Key Partners')

    cy.get('[data-testid="viewToggleButton"]').click()
    cy.url().should('include', '/canvas')
    cy.contains('Value Propositions')

    cy.get('[data-testid="viewToggleButton"]').click()
    cy.url().should('include', '/horizontal')
    cy.contains('Cost Structures')

    cy.get('[data-testid="viewToggleButton"]').click()
    cy.url().should('include', '/canvas')
    cy.contains('Revenue Streams')
  })
})
