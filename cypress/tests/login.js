describe('Testing login functionality', function() {
  it('should login and logout', function() {
    cy.visit('/')

    cy.get('#email')
      .type('stefan.franzen@addq.se')
      .should('have.value', 'stefan.franzen@addq.se')

    cy.get('#password')
      .type('ADDQbmc123!')
      .should('have.value', 'ADDQbmc123!')

    cy.get('[data-testid="loginSubmitButton"]').click()

    cy.contains('You are now logged in..')

    cy.get('[data-testid="navbarLogoutButton"]').click()

    cy.contains('You are now logged out..')
  })
})
