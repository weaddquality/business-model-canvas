describe('Testing the details', function() {
  beforeEach(function() {
    cy.login()
  })

  it('renders details-page', function() {
    cy.visit('/details/key-partners')
    cy.contains('Key Partners')
  })

  it('can visit details through navbar', function() {
    cy.getByTestId('navbarDropdownSplitButton').click()
    cy.getByText('Key Resources').click()

    cy.contains('Key Resources')
  })

  it('switch between read and write-mode', function() {
    cy.visit('/canvas', { timeout: 15000 })

    cy.getByText('Channels').click()

    cy.getByTestId('details-readmode')

    cy.getByText('Edit').click()
    cy.getByTestId('details-writemode')

    cy.getByText('Cancel').click()
    cy.getByTestId('details-readmode')
  })

  it('can create an item', function() {
    // test starts
    cy.server()
    cy.route('POST', '**/prod/bmc-items/create**').as('createdItem')
    cy.route('GET', '**/prod/bmc-items/list**').as('getUpdatedCanvasData')

    cy.visit('/details/channels')

    cy.wait('@getUpdatedCanvasData')

    cy.getByText('Add Item').click()
    cy.contains('Add Item').should('not.be.visible')

    cy.getByTestId('details-updateform-header')
      .type('New value header')
      .should('have.value', 'New value header')

    cy.getByTestId('details-updateform-text')
      .type('New value text')
      .should('have.value', 'New value text')

    cy.getByText('Create').click()

    cy.wait('@createdItem')
    cy.wait('@getUpdatedCanvasData')

    cy.getByTestId('details-list').within(() => {
      cy.getByText('New value header')
    })

    // clean up
    cy.get('@createdItem').then(data => {
      cy.deleteItem(data.response.body.BlockUuid)
    })
  })

  it('can update an item', function() {
    cy.server()
    cy.route('PUT', '**/prod/bmc-items/update**').as('updateCanvasData')
    cy.route('GET', '**/prod/bmc-items/list**').as('getUpdatedCanvasData')

    cy.visit('/details/channels')

    cy.wait('@getUpdatedCanvasData')

    // change to a new text
    cy.getByText('Edit').click()

    cy.getByTestId('details-updateform-header')
      .clear()
      .type('New value header')
      .should('have.value', 'New value header')

    cy.getByTestId('details-updateform-text')
      .clear()
      .type('New value text')
      .should('have.value', 'New value text')

    cy.getByText('Update').click()

    cy.wait('@updateCanvasData')

    cy.getByTestId('details-readform-header').should('have.text', 'New value header')
    cy.getByTestId('details-readform-text').should('have.text', 'New value text')

    // change to a old text
    cy.getByText('Edit').click()

    cy.getByTestId('details-updateform-header')
      .clear()
      .type('Old value header')
      .should('have.value', 'Old value header')

    cy.getByTestId('details-updateform-text')
      .clear()
      .type('Old value text')
      .should('have.value', 'Old value text')

    cy.getByText('Update').click()

    cy.wait('@updateCanvasData')

    cy.getByTestId('details-readform-header').should('have.text', 'Old value header')
    cy.getByTestId('details-readform-text').should('have.text', 'Old value text')
  })

  it('can delete an item', function() {
    // prepare testdata
    const inputHeader = `delete test: ${Math.random() * 999}`
    const inputText = 'delete test: A new item'
    cy.createItem({ header: inputHeader, text: inputText, block: 'Value Propositions' })

    // test starts
    cy.server()
    cy.route('GET', '**prod/bmc-items/list*').as('getUpdatedCanvasData')
    cy.visit('/details/value-propositions')

    cy.wait('@getUpdatedCanvasData')

    cy.getByText(inputHeader).click()
    cy.getByText('Edit').click()
    cy.route('DELETE', '**/prod/bmc-items/delete*').as('deleteRequest')
    cy.getByText('Delete').click()

    cy.wait('@deleteRequest').then(response => {
      expect(response.status).to.eq(200)
    })

    cy.contains(inputHeader).should('not.be.visible')

    cy.getByTestId('details-list-item')
      .first()
      .should('have.class', 'active')
  })

  it('should have a list item', function() {
    // prepare testdata
    const inputHeader = `list item-test: ${Math.random() * 999}`
    const inputText = 'list item-test: A new item'
    cy.createItem({ header: inputHeader, text: inputText, block: 'Value Propositions' }).as(
      'createdItem'
    )

    // tests starts
    cy.visit('/details/value-propositions')

    cy.contains(inputHeader)

    cy.get('@createdItem').then(data => {
      cy.deleteItem(data.BlockUuid)
    })
  })

  it('can select a specific item', function() {
    // prepare testdata
    const inputHeader = `specific-test: ${Math.random() * 999}`
    const inputText = 'specific-test: A new item'
    cy.createItem({ header: inputHeader, text: inputText, block: 'Value Propositions' }).as(
      'createdItem'
    )

    // test starts
    cy.visit('/details/value-propositions')

    cy.contains(inputHeader).click()

    cy.getByTestId('details-readform-header').should('have.text', inputHeader)
    cy.getByTestId('details-readform-text').should('have.text', inputText)
    cy.getByTestId('details-list').within(() => {
      cy.get('.active').contains(inputHeader)
    })

    // clean up
    cy.get('@createdItem').then(data => {
      cy.deleteItem(data.BlockUuid)
    })
  })

  it('can change selected item back and forth', function() {
    // prepare testdata
    // item 1
    const firstItemHeader = `first item: ${Math.random() * 999}`
    const firstItemText = 'first item: A new item'
    cy.createItem({ header: firstItemHeader, text: firstItemText, block: 'Value Propositions' }).as(
      'firstItem'
    )

    // item 2
    const secondItemHeader = `second item: ${Math.random() * 999}`
    const secondItemText = 'second item: A new item'
    cy.createItem({
      header: secondItemHeader,
      text: secondItemText,
      block: 'Value Propositions',
    }).as('secondItem')

    // test starts
    cy.visit('/details/value-propositions')

    // click first created item
    cy.contains(firstItemHeader).click()

    cy.getByTestId('details-readform-header').should('have.text', firstItemHeader)
    cy.getByTestId('details-readform-text').should('have.text', firstItemText)
    cy.getByTestId('details-list').within(() => {
      cy.get('.active').contains(firstItemHeader)
    })

    cy.get('@firstItem').then(data => {
      cy.url().should('include', encodeURI(data.BlockUuid))
    })

    // click second created item
    cy.contains(secondItemHeader).click()

    cy.getByTestId('details-readform-header').should('have.text', secondItemHeader)
    cy.getByTestId('details-readform-text').should('have.text', secondItemText)
    cy.getByTestId('details-list').within(() => {
      cy.get('.active').contains(secondItemHeader)
    })

    cy.get('@secondItem').then(data => {
      cy.url().should('include', encodeURI(data.BlockUuid))
    })

    // click first created item
    cy.contains(firstItemHeader).click()

    cy.getByTestId('details-readform-header').should('have.text', firstItemHeader)
    cy.getByTestId('details-readform-text').should('have.text', firstItemText)
    cy.getByTestId('details-list').within(() => {
      cy.get('.active').contains(firstItemHeader)
    })

    cy.get('@firstItem').then(data => {
      cy.url().should('include', encodeURI(data.BlockUuid))
    })

    // clean up
    cy.get('@firstItem').then(data => {
      cy.deleteItem(data.BlockUuid)
    })
    cy.get('@secondItem').then(data => {
      cy.deleteItem(data.BlockUuid)
    })
  })
})
