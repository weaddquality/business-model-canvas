import React from 'react'
import './Canvas.css'
import CanvasBlock from '../canvas-block/Canvas-block'
import blocks from '../canvas-block/content'

const Horizontal = () => {
  const canvasBlocks = blocks.map(block => {
    return <CanvasBlock key={block.className} content={block} />
  })
  return (
    <div className="horizontal-view" data-testid="horizontalView">
      {canvasBlocks}
    </div>
  )
}

export default Horizontal
