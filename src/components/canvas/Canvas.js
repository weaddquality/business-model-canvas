import React, { useEffect } from 'react'
import './Canvas.css'
import CanvasBlock from '../canvas-block/Canvas-block'

const Canvas = props => {
  const testId = props.location.pathname === '/canvas' ? 'canvasView' : 'horizontalView'
  const className =
    props.location.pathname === '/canvas' ? 'canvas-view canvas-horizontal-view' : 'horizontal-view'

  useEffect(() => {
    props.getCanvasData()
  }, [])

  const canvasBlocks = Object.entries(props.listResponse).map(block => {
    return <CanvasBlock key={block.blockInKebabCase} blockId={block[0]} content={block[1]} />
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
