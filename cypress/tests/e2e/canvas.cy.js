describe('Testing the canvas', function() {
  beforeEach(function() {
    cy.login()
    cy.visit('/Team-Continuous/canvas')
  })

  it('navigate to canvas from navbar', function() {
    cy.visit('/')
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText('Team Continuous').click()
    cy.get('#canvas')
  })

  it('should have atleast one canvas block', function() {
    cy.get('#canvas-block')
  })

  it('should have all block headers', function() {
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
    cy.get('#canvas-block').click()
    cy.get('#details')
  })

  it('can change selected team and load team specific canvas data', function() {
    cy.server()

    cy.route('GET', '**prod/bmc-items/list?Team=Team Continuous').as('getTeamContinuousCanvasData')
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText('Team Continuous').click()
    cy.getByTestId('navbarDropdownSplitButton').should('have.text', 'Team Continuous')
    cy.url().should('include', 'Team-Continuous')
    cy.wait('@getTeamContinuousCanvasData')

    cy.route('GET', '**prod/bmc-items/list?Team=Team Frontend Auto').as(
      'getTeamFrontendAutoCanvasData'
    )
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText('Team Frontend Auto').click()
    cy.getByTestId('navbarDropdownSplitButton').should('have.text', 'Team Frontend Auto')
    cy.url().should('include', 'Team-Frontend-Auto')
    cy.wait('@getTeamFrontendAutoCanvasData')

    cy.route('GET', '**prod/bmc-items/list?Team=Team Mobile UX').as('getTeamMobileUXCanvasData')
    cy.getByTestId('navbarDropdownSubmenuToggle').click()
    cy.getByText('Team Mobile UX').click()
    cy.getByTestId('navbarDropdownSplitButton').should('have.text', 'Team Mobile UX')
    cy.url().should('include', 'Team-Mobile-UX')
    cy.wait('@getTeamMobileUXCanvasData')
  })
})
