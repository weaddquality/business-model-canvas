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
    cy.wait('@getUpdatedCanvasData')

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
    cy.wait('@getUpdatedCanvasData')

    cy.getByTestId('details-readform-header').should('have.text', 'Old value header')
    cy.getByTestId('details-readform-text').should('have.text', 'Old value text')
  })

  it('can delete an item', function() {
    // prepare testdata
    const inputHeader = `delete test: ${Math.random() * 999}`
    const inputText = 'delete test: A new item'
    cy.createItem({ header: inputHeader, text: inputText })

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
    cy.createItem({ header: inputHeader, text: inputText })

    // tests starts
    cy.visit('/details/value-propositions')

    cy.contains(inputHeader)

    cy.getByText(inputHeader).click()
    cy.getByText('Edit').click()

    cy.server()
    cy.route('DELETE', '**/prod/bmc-items/delete*').as('deleteRequest')
    cy.getByText('Delete').click()

    cy.wait('@deleteRequest').then(response => {
      expect(response.status).to.eq(200)
    })
  })

  it('can select a specific item', function() {
    // prepare testdata
    const inputHeader = `specific-test: ${Math.random() * 999}`
    const inputText = 'specific-test: A new item'
    cy.createItem({ header: inputHeader, text: inputText })

    // test starts
    cy.visit('/details/value-propositions')

    cy.contains(inputHeader).click()

    cy.getByTestId('details-readform-header').should('have.text', inputHeader)
    cy.getByTestId('details-readform-text').should('have.text', inputText)
    cy.getByTestId('details-list').within(() => {
      cy.get('.active').contains(inputHeader)
    })

    // clean up
    cy.getByText(inputHeader).click()
    cy.getByText('Edit').click()

    cy.server()
    cy.route('DELETE', '**/prod/bmc-items/delete*').as('deleteRequest')
    cy.getByText('Delete').click()

    cy.wait('@deleteRequest').then(response => {
      expect(response.status).to.eq(200)
    })
  })

  it('can change selected item back and forth', function() {
    // prepare testdata
    // item 1
    const firstItemHeader = `first item: ${Math.random() * 999}`
    const firstItemText = 'first item: A new item'
    cy.createItem({ header: firstItemHeader, text: firstItemText }).as('firstItem')

    // item 2
    cy.visit('/item/create')

    const secondItemHeader = `second item: ${Math.random() * 999}`
    const secondItemText = 'second item: A new item'
    cy.createItem({ header: secondItemHeader, text: secondItemText }).as('secondItem')

    // test starts
    cy.visit('/details/value-propositions')

    // click first created item
    cy.contains(firstItemHeader).click()

    cy.getByTestId('details-readform-header').should('have.text', firstItemHeader)
    cy.getByTestId('details-readform-text').should('have.text', firstItemText)
    cy.getByTestId('details-list').within(() => {
      cy.get('.active').contains(firstItemHeader)
    })

    cy.get('@firstItem').then(http => {
      cy.url().should('include', encodeURI(http.BlockUuid))
    })

    // click second created item
    cy.contains(secondItemHeader).click()

    cy.getByTestId('details-readform-header').should('have.text', secondItemHeader)
    cy.getByTestId('details-readform-text').should('have.text', secondItemText)
    cy.getByTestId('details-list').within(() => {
      cy.get('.active').contains(secondItemHeader)
    })

    cy.get('@secondItem').then(http => {
      cy.url().should('include', encodeURI(http.BlockUuid))
    })

    // click first created item
    cy.contains(firstItemHeader).click()

    cy.getByTestId('details-readform-header').should('have.text', firstItemHeader)
    cy.getByTestId('details-readform-text').should('have.text', firstItemText)
    cy.getByTestId('details-list').within(() => {
      cy.get('.active').contains(firstItemHeader)
    })

    cy.get('@firstItem').then(http => {
      cy.url().should('include', encodeURI(http.BlockUuid))
    })

    // clean up
    // first item
    cy.getByText(firstItemHeader).click()
    cy.getByText('Edit').click()
    cy.server()
    cy.route('DELETE', '**/prod/bmc-items/delete*').as('deleteRequest')
    cy.getByText('Delete').click()

    cy.wait('@deleteRequest').then(response => {
      expect(response.status).to.eq(200)
    })
    // second item
    cy.getByText(secondItemHeader).click()
    cy.getByText('Edit').click()
    cy.route('DELETE', '**/prod/bmc-items/delete*').as('deleteRequest')
    cy.getByText('Delete').click()

    cy.wait('@deleteRequest').then(response => {
      expect(response.status).to.eq(200)
    })
  })
})
