import 'cypress-testing-library/add-commands'

Cypress.Commands.add('login', () => {
  cy.get('#email')
    .type('stefan.franzen@addq.se')
    .should('have.value', 'stefan.franzen@addq.se')
  cy.get('#password')
    .type('ADDQbmc123!')
    .should('have.value', 'ADDQbmc123!')
  cy.get('[data-testid="loginSubmitButton"]').click()
  cy.contains('You are now logged in..', { timeout: 10000 })
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="navbarLogoutButton"]').click()
  cy.contains('You are now logged out..')
})
