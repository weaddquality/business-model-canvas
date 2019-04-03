describe('Testing creating items', () => {
  before(() => {
    cy.visit('/')
    cy.login()
  })

  it('should have correct request body', () => {
    const inputHeader = 'CreateItem Header'
    const inputText = 'CreateItem Text'
    const expectedResultBody = {
      Team: 'Team Continuous',
      Block: 'Value Propositions',
      ItemHeader: 'CreateItem Header',
      ItemText: 'CreateItem Text',
    }

    cy.visit('/item/create')

    cy.get('[data-testid="createItemInputHeader"]').type(inputHeader)

    cy.get('[data-testid="createItemInputText"]').type(inputText)

    cy.server()
    cy.route('POST', '**/prod/bmc-items/create').as('createItemRequest')

    cy.get('[data-testid="submitButton"]').click()

    cy.wait('@createItemRequest').then(http => {
      // request data
      expect(http.method).to.eq('POST')
      expect(http.request.body.Item.ItemHeader).to.eq(inputHeader)
      expect(http.request.body.Item.ItemText).to.eq(inputText)

      // response data
      expect(http.status).to.eq(200)
      expect(http.response.body.Team).to.eq(expectedResultBody.Team)
      expect(http.response.body.Block).to.eq(expectedResultBody.Block)
      expect(http.response.body.ItemHeader).to.eq(expectedResultBody.ItemHeader)
      expect(http.response.body.ItemText).to.eq(expectedResultBody.ItemText)
    })
  })
})
