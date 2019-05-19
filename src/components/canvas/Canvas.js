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

  const canvasBlocks = Object.entries(props.listResponse).map(block => {
    const blockName = block[0]
    const blockData = block[1]
    return <CanvasBlock key={block.blockInKebabCase} blockName={blockName} blockData={blockData} />
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
