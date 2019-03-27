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

  it.only('switch between read and write-mode', function() {
    cy.visit('/canvas')
    cy.getByText('Channels').click()

    cy.getByTestId('details-readmode')

    cy.getByText('Edit').click()
    cy.getByTestId('details-writemode')

    cy.getByText('Cancel').click()
    cy.getByTestId('details-readmode')
  })
})
