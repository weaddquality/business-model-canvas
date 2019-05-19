import React from 'react'
import 'cypress-react-unit-test'
import { StaticRouter } from 'react-router-dom'
import CanvasBlock from '../../../src/components/canvas-block/Canvas-block'

const blockData = {
  block: 'Value Propositions',
  items: [
    {
      ItemHeader: 'my header',
      ItemText: 'my text',
    },
  ],
}

describe.skip('Component testing of CanvasBlock', () => {
  it('renders', () => {
    cy.mount(
      <StaticRouter>
        <CanvasBlock blockData={blockData} />
      </StaticRouter>
    )
    cy.contains('my header')
    cy.contains('my text')
  })
})
