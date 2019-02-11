import React from 'react'
import './canvas.css'
import CanvasBlock from '../canvas-block/canvas-block'
import blocks from '../canvas-block/content'

const Horizontal = () => {
  const canvasBlocks = blocks.map(block => {
    return <CanvasBlock key={block.className} content={block} />
  })

  return <div className="horizontal-view">{canvasBlocks}</div>
}

export default Horizontal
