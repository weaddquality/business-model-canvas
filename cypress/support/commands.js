import 'cypress-testing-library/add-commands'
import Amplify, { Auth } from 'aws-amplify'
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
