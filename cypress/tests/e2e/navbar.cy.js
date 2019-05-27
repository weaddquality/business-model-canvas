describe('Testing the navbar', function() {
  beforeEach(function() {
    cy.login()
    cy.visit('/')
  })

  it('the home-button', function() {
    cy.visit('/notfound')
    cy.getByText('Business Model Canvas').click()
    cy.contains('You are now logged in..')
  })

  it('the dropdown', function() {
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText('Team Continuous').click()
    cy.contains('Key Partners')
  })

  it('the splitbutton-arrow on dropdown', function() {
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText('Team Continuous').click()
    cy.getByTestId('navbarDropdownSplitButton').click()
    cy.contains('Key Partners')
  })

  it('the splitbutton-arrow on dropdowns submenu OK', function() {
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByTestId('navbarDropdownSubmenu').within(() => {
      cy.get('a')
        .first()
        .click()
    })
    cy.contains('Value Proposition')
  })

  it('the view toggle', function() {
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText('Team Continuous').click()
    cy.getByTestId('viewToggleButton').click()
    cy.url().should('include', '/horizontal')
    cy.contains('Key Partners')

    cy.getByTestId('viewToggleButton').click()
    cy.url().should('include', '/canvas')
    cy.contains('Value Propositions')

    cy.getByTestId('viewToggleButton').click()
    cy.url().should('include', '/horizontal')
    cy.contains('Cost Structures')

    cy.getByTestId('viewToggleButton').click()
    cy.url().should('include', '/canvas')
    cy.contains('Revenue Streams')
  })

  it('should have a logout button', function() {
    cy.getByTestId('navbarLogoutButton')
      .should('have.attr', 'href', '/logout')
      .should('have.text', ' Logout')
  })
})
