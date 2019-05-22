import React, { useEffect } from 'react'
import './Canvas.css'
import { BLOCKS } from '../../constants/constants'
import CanvasBlock from '../canvas-block/Canvas-block'

const Canvas = props => {
  const testId = props.location.pathname === '/canvas' ? 'canvasView' : 'horizontalView'
  const className =
    props.location.pathname === '/canvas' ? 'canvas-view canvas-horizontal-view' : 'horizontal-view'

  useEffect(() => {
    props.getCanvasData()
  }, [])

  const canvasBlocks = Object.entries(props.listResponse).map(block => {
    const blockName = block[0]
    const blockData = block[1]
    const blockDescription = BLOCKS[blockName.replace(' ', '_').toUpperCase()].description
    return (
      <CanvasBlock
        key={blockData.blockInKebabCase}
        blockName={blockName}
        blockDescription={blockDescription}
        blockData={blockData}
      />
    )
  })
  return (
    <div id="canvas">
      <div className={className} data-testid={testId}>
        {canvasBlocks}
      </div>
    </div>
  )
}

export default Canvas
