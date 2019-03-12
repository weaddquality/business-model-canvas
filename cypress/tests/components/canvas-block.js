import React from 'react'
import 'cypress-react-unit-test'
import { CanvasBlock } from '../../../src/components/canvas-block/Canvas-block'

const props = {
  content: {
    items: [
      {
        itemHeader: 'my header',
        itemText: 'my text',
      },
    ],
  },
}

describe('Component testing of CanvasBlock', () => {
  it('renders', () => {
    cy.mount(<CanvasBlock props={props} />)
    cy.contains('my header')
  })
})
