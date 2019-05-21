describe('Integrationtest of getting items', function() {
  const inputHeader = 'Int.test list item - header'
  const inputText = 'Int.test list item - text'
  beforeEach(() => {
    cy.login()
    cy.createItem({
      header: inputHeader,
      block: 'Channels',
      text: inputText,
    }).as('createdItem')
  })

  afterEach(() => {
    cy.get('@createdItem').then(data => {
      cy.deleteItem(data.BlockUuid)
    })
  })

  it('testing the request data and response data', function() {
    cy.server()
    cy.route('GET', '**/prod/bmc-items/list**').as('listRequest')

    cy.visit('/canvas')
    cy.wait('@listRequest').then(http => {
      // request data
      expect(http.method).to.eq('GET')
      // response data
      expect(http.status).to.eq(200)
      // expect to have all blocks
      expect('Channels', http.response.body.blocks['Channels']).to.exist
      expect('Cost Structures', http.response.body.blocks['Cost Structures']).to.exist
      expect('Customer Relationships', http.response.body.blocks['Customer Relationships']).to.exist
      expect('Customer Segments', http.response.body.blocks['Customer Segments']).to.exist
      expect('Key Activities', http.response.body.blocks['Key Activities']).to.exist
      expect('Key Partners', http.response.body.blocks['Key Partners']).to.exist
      expect('Key Resources', http.response.body.blocks['Key Resources']).to.exist
      expect('Revenue Streams', http.response.body.blocks['Revenue Streams']).to.exist
      expect('Value Propositions', http.response.body.blocks['Value Propositions']).to.exist
      // expect to have blockInKebabCase
      expect(http.response.body.blocks['Channels'].blockInKebabCase).to.exist
      // expect to have an item
      expect(http.response.body.blocks['Channels'].items[0].BlockUuid).to.exist
      expect(http.response.body.blocks['Channels'].items[0].ItemHeader).to.exist
      expect(http.response.body.blocks['Channels'].items[0].ItemText).to.exist
      expect(http.response.body.blocks['Channels'].items[0].CreatedAt).to.exist
    })
  })
})
