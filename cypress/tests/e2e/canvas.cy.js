describe('Testing the canvas', function() {
  beforeEach(function() {
    cy.login()
  })

  it('navigate to canvas from navbar', function() {
    cy.visit('/')
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText('Team Continuous').click()
    cy.get('#canvas')
  })

  it('should have atleast one canvas block', function() {
    cy.visit('/Team-Continuous/canvas')
    cy.get('#canvas-block')
  })

  it('should have all block headers', function() {
    cy.visit('/Team-Continuous/canvas')
    cy.contains('Key Partners')
    cy.contains('Key Activities')
    cy.contains('Value Propositions')
    cy.contains('Customer Relationships')
    cy.contains('Customer Segments')
    cy.contains('Key Resources')
    cy.contains('Channels')
    cy.contains('Cost Structures')
    cy.contains('Revenue Streams')
  })

  it('should have all block descriptions', function() {
    cy.visit('/Team-Continuous/canvas')
    cy.contains('How do we reach our customer segments')
    cy.contains('What key activities do our value propositions require')
    cy.contains('What value do we deliver to the customer')
    cy.contains('What type of relationships do our customer segments expect')
    cy.contains('Who are we creating value for')
    cy.contains('What key resources do our value propositions require')
    cy.contains('What are the important costs inherent in our business model')
    cy.contains('What value are our customers willing to pay for')
  })

  it('should be able to click a canvas-block and navigate to the details page', function() {
    cy.visit('/Team-Continuous/canvas')
    cy.get('#canvas-block').click()
    cy.get('#details')
  })

  it('can change selected team and load team specific canvas data', function() {
    cy.server()
    const teamContinuous = 'Team Continuous'
    const teamFrontendAuto = 'Team Frontend Auto'
    const teamMobileUX = 'Team Mobile UX'
    const teamContinuousItemHeader = `E2E Canvas - ${teamContinuous}`
    const teamFrontendAutoItemHeader = `E2E Canvas - ${teamFrontendAuto}`
    const teamMobileUXItemHeader = `E2E Canvas - ${teamMobileUX}`

    cy.log('Begin prepare testdata')
    cy.createItem({
      team: `${teamContinuous}`,
      header: teamContinuousItemHeader,
      text: `${teamContinuous} Value Prop Text`,
      block: 'Value Propositions',
    }).as('teamContinuousItem')

    cy.createItem({
      team: `${teamFrontendAuto}`,
      header: teamFrontendAutoItemHeader,
      text: `${teamFrontendAuto} Value Prop Text`,
      block: 'Value Propositions',
    }).as('teamFrontendAutoItem')

    cy.createItem({
      team: `${teamMobileUX}`,
      header: teamMobileUXItemHeader,
      text: `${teamMobileUX} Value Prop Text`,
      block: 'Value Propositions',
    }).as('teamMobileUxItem')
    cy.log('Finish prepare testdata')

    cy.log('Begin test')
    cy.route('GET', `**prod/bmc-items/list?Team=${teamContinuous}`).as(
      'getTeamContinuousCanvasData'
    )
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText(`${teamContinuous}`).click()
    cy.getByTestId('navbarDropdownSplitButton').should('have.text', `${teamContinuous}`)
    cy.url().should('include', 'Team-Continuous')
    cy.wait('@getTeamContinuousCanvasData')
    cy.getByText(teamContinuousItemHeader)
    cy.queryByText(teamFrontendAutoItemHeader, { timeout: 0 }).should('be.null')
    cy.queryByText(teamMobileUXItemHeader, { timeout: 0 }).should('be.null')

    cy.route('GET', `**prod/bmc-items/list?Team=${teamFrontendAuto}`).as(
      'getTeamFrontendAutoCanvasData'
    )
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText(`${teamFrontendAuto}`).click()
    cy.getByTestId('navbarDropdownSplitButton').should('have.text', `${teamFrontendAuto}`)
    cy.url().should('include', 'Team-Frontend-Auto')
    cy.wait('@getTeamFrontendAutoCanvasData')
    cy.getByText(teamFrontendAutoItemHeader)
    cy.queryByText(teamContinuousItemHeader, { timeout: 0 }).should('be.null')
    cy.queryByText(teamMobileUXItemHeader, { timeout: 0 }).should('be.null')

    cy.route('GET', `**prod/bmc-items/list?Team=${teamMobileUX}`).as('getTeamMobileUXCanvasData')
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText(`${teamMobileUX}`).click()
    cy.getByTestId('navbarDropdownSplitButton').should('have.text', `${teamMobileUX}`)
    cy.url().should('include', 'Team-Mobile-UX')
    cy.wait('@getTeamMobileUXCanvasData')
    cy.getByText(teamMobileUXItemHeader)
    cy.queryByText(teamContinuousItemHeader, { timeout: 0 }).should('be.null')
    cy.queryByText(teamFrontendAutoItemHeader, { timeout: 0 }).should('be.null')
    cy.log('Finish test')

    cy.log('Begin clean up')
    cy.get('@teamContinuousItem').then(data => {
      cy.deleteItem({ team: `${teamContinuous}`, blockUuid: data.BlockUuid })
    })
    cy.get('@teamFrontendAutoItem').then(data => {
      cy.deleteItem({ team: `${teamFrontendAuto}`, blockUuid: data.BlockUuid })
    })
    cy.get('@teamMobileUxItem').then(data => {
      cy.deleteItem({ team: `${teamMobileUX}`, blockUuid: data.BlockUuid })
    })
    cy.log('Finish clean up')
  })
})
