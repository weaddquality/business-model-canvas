describe('Testing creating items', () => {
  before(() => {
    cy.visit('/')
    cy.login()
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
      // request data
      expect(http.method).to.eq('POST')
      expect(http.request.body.Item.ItemText).to.eq(inputContent)

      // response data
      expect(http.status).to.eq(200)
      expect(http.response.body.Team).to.eq(expectedResultBody.Team)
      expect(http.response.body.Block).to.eq(expectedResultBody.Block)
      expect(http.response.body.ItemHeader).to.eq(expectedResultBody.ItemHeader)
    })
  })
})
