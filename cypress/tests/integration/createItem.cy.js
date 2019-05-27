describe('Integrationtest of creating items', function() {
  beforeEach(() => {
    cy.login()
  })

  afterEach(() => {
    cy.get('@createItemRequest').then(data => {
      cy.deleteItem({ team: 'Team Continuous', blockUuid: data.response.body.BlockUuid })
    })
  })

  it('testing the request data and response data', function() {
    const inputHeader = 'CreateItem Header'
    const inputText = 'CreateItem Text'
    cy.server()
    cy.route('GET', '**/prod/bmc-items/list**').as('getUpdatedCanvasData')
    cy.visit('Team-Continuous/details/value-propositions')

    cy.wait('@getUpdatedCanvasData')

    cy.getByText('Add Item').click()

    cy.getByTestId('details-updateform-header')
      .type(inputHeader)
      .should('have.value', inputHeader)
    cy.getByTestId('details-updateform-text')
      .type(inputText)
      .should('have.value', inputText)

    cy.server()
    cy.route('POST', '**/prod/bmc-items/create').as('createItemRequest')

    cy.getByText('Create').click()

    cy.wait('@createItemRequest').then(http => {
      // request data
      expect(http.method).to.eq('POST')
      expect(http.request.body.Item.Team).to.eq('Team Continuous')
      expect(http.request.body.Item.Block).to.eq('Value Propositions')
      expect(http.request.body.Item.ItemHeader).to.eq(inputHeader)
      expect(http.request.body.Item.ItemText).to.eq(inputText)

      // response data
      expect(http.status).to.eq(200)
      expect(http.response.body.Team).to.eq('Team Continuous')
      expect(http.response.body.Block).to.eq('Value Propositions')
      expect(http.response.body.BlockUuid).to.contain('Value Propositions')
      expect(http.response.body.ItemHeader).to.eq(inputHeader)
      expect(http.response.body.ItemText).to.eq(inputText)
    })
  })
})
