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

  const canvasBlocks = props.listResponse.map(block => {
    const className = block.block.toLowerCase().replace(' ', '-')
    return <CanvasBlock key={className} content={block} />
  })
  return (
    <div>
      <div className={className} data-testid={testId}>
        {canvasBlocks}
      </div>
    </div>
  )
}

export default Canvas
