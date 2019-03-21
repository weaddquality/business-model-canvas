describe('Testing the details', function() {
  before(function() {
    cy.visit('/')
    cy.login()
  })

  it('should render a card with data', function() {
    cy.getByTestId('navbarDropdownSplitButton').click()
    cy.getByText('Key Resources').click()

    cy.contains('Key Resources')
    cy.contains('Resource Z')
    cy.contains('With resource Z we could do words words words')
  })
})
