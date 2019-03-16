describe('Testing creating items', () => {
  before(() => {
    cy.visit('/')

    cy.get('#email')
      .type('stefan.franzen@addq.se')
      .should('have.value', 'stefan.franzen@addq.se')

    cy.get('#password')
      .type('ADDQbmc123!')
      .should('have.value', 'ADDQbmc123!')

    cy.get('[data-testid="loginSubmitButton"]').click()

    cy.contains('You are now logged in..')
  })

  it('should have correct request body', () => {
    const inputContent = 'createItemtest'
    const expectedResultBody = {
      Team: 'Team Continuous',
      Block: 'Value Propositions',
      ItemHeader: 'Value props header',
      ItemText: 'createItemtest',
    }

    cy.visit('/item/create')

    cy.get('[data-testid="createItemInputForm"]').type(inputContent)

    cy.server()
    cy.route('POST', '**/prod/bmc-items/create').as('createItemRequest')

    cy.get('[data-testid="submitButton"]').click()

    cy.wait('@createItemRequest').then(http => {
      expect(http.status).to.eq(200)
      expect(http.method).to.eq('POST')
      expect(http.request.body.Item.Team).to.eq(expectedResultBody.Team)
      expect(http.request.body.Item.Block).to.eq(expectedResultBody.Block)
      expect(http.request.body.Item.ItemHeader).to.eq(expectedResultBody.ItemHeader)
      expect(http.request.body.Item.ItemText).to.eq(inputContent)
    })
  })
})
