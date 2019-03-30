import React from 'react'
import 'cypress-react-unit-test'
import { StaticRouter } from 'react-router-dom'
import CanvasBlock from '../../../src/components/canvas-block/Canvas-block'

const content = {
  block: 'Value Propositions',
  items: [
    {
      ItemHeader: 'my header',
      ItemText: 'my text',
    },
  ],
}

describe('Component testing of CanvasBlock', () => {
  it('renders', () => {
    cy.mount(
      <StaticRouter>
        <CanvasBlock content={content} />
      </StaticRouter>
    )
    cy.contains('my header')
    cy.contains('my text')
  })
})
