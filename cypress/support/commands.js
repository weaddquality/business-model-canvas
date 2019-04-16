import 'cypress-testing-library/add-commands'
import Amplify, { Auth, API } from 'aws-amplify'
import aws_exports from '../../src/aws-exports'
Amplify.configure(aws_exports)

Cypress.Commands.add('login', () => {
  return Auth.signIn('stefan.franzen@addq.se', 'ADDQbmc123!').catch(err =>
    console.log('An error occured when authenticating using AWS Amplify: ', err)
  )
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="navbarLogoutButton"]').click()
  cy.contains('You are now logged out..')
})

Cypress.Commands.add('createItem', input => {
  const item = {
    TableName: 'BusinessModelCanvas',
    Team: 'Team Continuous',
    Block: 'Value Propositions',
    BlockDescription: 'What value do we deliver to the customer',
    ItemHeader: input.header,
    ItemText: input.text,
  }
  return API.post('bmc-items', '/bmc-items/create', {
    body: {
      TableName: item.TableName,
      Item: {
        Team: item.Team,
        Block: item.Block,
        BlockDescription: item.BlockDescription,
        ItemHeader: item.ItemHeader,
        ItemText: item.ItemText,
      },
    },
  })
})
