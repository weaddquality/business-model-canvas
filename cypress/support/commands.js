import 'cypress-testing-library/add-commands'
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../../src/aws-exports'
Amplify.configure(aws_exports)
import { createItem } from '../../src/components/create/Create'
import { deleteItem } from '../../src/components/details/Details'

Cypress.Commands.add('login', () => {
  return Auth.signIn('stefan.franzen@addq.se', 'ADDQbmc123!').catch(err =>
    console.log('An error occured when authenticating using AWS Amplify: ', err)
  )
})

Cypress.Commands.add('createItem', input => {
  return createItem({
    header: input.header,
    text: input.text,
  })
})

Cypress.Commands.add('deleteItem', blockUuid => {
  return deleteItem(blockUuid)
})
