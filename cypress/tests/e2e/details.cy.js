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
    const inputHeader = `E2E create test - header: ${Math.random() * 999}`
    const inputText = 'E2E create test - text'
    // test starts
    cy.server()
    cy.route('POST', '**/prod/bmc-items/create**').as('createdItem')
    cy.route('GET', '**/prod/bmc-items/list**').as('getUpdatedCanvasData')

    cy.visit('/details/channels')

    cy.wait('@getUpdatedCanvasData')

    cy.getByText('Add Item').click()
    cy.contains('Add Item').should('not.be.visible')

    cy.getByTestId('details-updateform-header')
      .type(inputHeader)
      .should('have.value', inputHeader)

    cy.getByTestId('details-updateform-text')
      .type(inputText)
      .should('have.value', inputText)

    cy.getByText('Create').click()

    cy.wait('@createdItem')
    cy.wait('@getUpdatedCanvasData')

    cy.getByTestId('details-list').within(() => {
      cy.getByText(inputHeader)
    })

    cy.getByTestId('details-readform-header').should('have.text', inputHeader)

    cy.getByTestId('details-readform-text').should('have.text', inputText)

    // clean up
    cy.get('@createdItem').then(data => {
      cy.deleteItem(data.response.body.BlockUuid)
    })
  })

  it('can update an item', function() {
    const inputHeaderNew = `E2E update test - header new: ${Math.random() * 999}`
    const inputTextNew = 'E2E update test - text new'
    const inputHeaderOld = `E2E update test - header old: ${Math.random() * 999}`
    const inputTextOld = 'E2E update test - text old'

    cy.server()
    cy.route('PUT', '**/prod/bmc-items/update**').as('updateCanvasData')
    cy.route('GET', '**/prod/bmc-items/list**').as('getUpdatedCanvasData')

    cy.visit('/details/channels')

    cy.wait('@getUpdatedCanvasData')

    // change to a new text
    cy.getByText('Edit').click()

    cy.getByTestId('details-updateform-header')
      .clear()
      .type(inputHeaderNew)
      .should('have.value', inputHeaderNew)

    cy.getByTestId('details-updateform-text')
      .clear()
      .type(inputTextNew)
      .should('have.value', inputTextNew)

    cy.getByText('Update').click()

    cy.wait('@updateCanvasData')

    cy.getByTestId('details-readform-header').should('have.text', inputHeaderNew)
    cy.getByTestId('details-readform-text').should('have.text', inputTextNew)

    // change to a old text
    cy.getByText('Edit').click()

    cy.getByTestId('details-updateform-header')
      .clear()
      .type(inputHeaderOld)
      .should('have.value', inputHeaderOld)

    cy.getByTestId('details-updateform-text')
      .clear()
      .type(inputTextOld)
      .should('have.value', inputTextOld)

    cy.getByText('Update').click()

    cy.wait('@updateCanvasData')

    cy.getByTestId('details-readform-header').should('have.text', inputHeaderOld)
    cy.getByTestId('details-readform-text').should('have.text', inputTextOld)
  })

  it('can delete an item', function() {
    // prepare testdata
    const inputHeader = `E2E delete test: ${Math.random() * 999}`
    const inputText = 'E2E delete test: A new item'
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
    const inputHeader = `E2E list item test: ${Math.random() * 999}`
    const inputText = 'E2E list item test: A new item'
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
    const inputHeader = `E2E specific test: ${Math.random() * 999}`
    const inputText = 'E2E specific test: A new item'
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
    cy.server()
    cy.route('GET', '**/prod/bmc-items/list**').as('getUpdatedCanvasData')

    // prepare testdata
    // item 1
    const firstItemHeader = `E2E select test item1: ${Math.random() * 999}`
    const firstItemText = 'E2E select test item1: A new item'
    cy.createItem({ header: firstItemHeader, text: firstItemText, block: 'Value Propositions' }).as(
      'firstItem'
    )

    // item 2
    const secondItemHeader = `E2E select test item2: ${Math.random() * 999}`
    const secondItemText = 'E2E select test item2: A new item'
    cy.createItem({
      header: secondItemHeader,
      text: secondItemText,
      block: 'Value Propositions',
    }).as('secondItem')

    // test starts
    cy.visit('/details/value-propositions')

    cy.wait('@getUpdatedCanvasData')

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

  it('can visit a direct link to details page', function() {
    // prepare testdata
    const inputHeader = `E2E direct link test - header: ${Math.random() * 999}`
    const inputText = 'E2E direct link test - text'
    cy.createItem({
      header: inputHeader,
      text: inputText,
      block: 'Value Propositions',
    }).as('createdItem')

    // tests starts here
    cy.get('@createdItem').then(response => {
      const blockInKebabcase = response.Block.toLowerCase().replace(' ', '-')
      cy.server()
      cy.route('GET', '**/prod/bmc-items/list**').as('getUpdatedCanvasData')
      cy.visit(`/details/${blockInKebabcase}/${response.BlockUuid}`)
      cy.wait('@getUpdatedCanvasData')

      cy.contains(inputText)
      cy.contains(inputHeader)
    })

    // clean up
    cy.get('@createdItem').then(data => {
      cy.deleteItem(data.BlockUuid)
    })
  })

  it('renders an empty card and no selected item when visiting a non-existing item', function() {
    // prepare testdata
    const inputHeader = `E2E non-existing item test - header: ${Math.random() * 999}`
    const inputText = 'E2E non-existing item test - text'
    cy.createItem({
      header: inputHeader,
      text: inputText,
      block: 'Value Propositions',
    }).as('createdItem')

    // tests starts here
    cy.visit('/details/value-propositions/Value%20Propositions_8b1fc6e0-7c0f-11e9-not-existing')

    cy.getAllByTestId('details-list-item').each($item => {
      cy.log($item)
      cy.wrap($item).should('not.have.class', 'active')
    })

    // clean up
    cy.get('@createdItem').then(data => {
      cy.deleteItem(data.BlockUuid)
    })
  })
})
