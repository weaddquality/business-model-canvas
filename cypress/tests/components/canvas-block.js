import React from 'react'
import 'cypress-react-unit-test'
import CanvasBlock from '../../../src/components/canvas-block/Canvas-block'

const content = {
  block: 'Value Propositions',
  items: [
    {
      itemHeader: 'my header',
      ItemText: 'my text',
    },
  ],
}

describe('Component testing of CanvasBlock', () => {
  it('renders', () => {
    cy.mount(<CanvasBlock content={content} />)
    cy.contains('my header')
  })
})
