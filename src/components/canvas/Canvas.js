import React, { useEffect } from 'react'
import './Canvas.css'
import CanvasBlock from '../canvas-block/Canvas-block'

const Canvas = props => {
  const testId =
    props.location.pathname === `/${props.match.params.team}/canvas`
      ? 'canvasView'
      : 'horizontalView'
  const className =
    props.location.pathname === `/${props.match.params.team}/canvas`
      ? 'canvas-view canvas-horizontal-view'
      : 'horizontal-view'

  useEffect(() => {
    props.getCanvasData(props.match.params.team)
  }, [])

  const canvasBlocks = props.listResponse.map(block => {
    const className = block.block.toLowerCase().replace(' ', '-')
    return <CanvasBlock key={className} content={block} />
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
