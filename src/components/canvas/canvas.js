import React from 'react'
import './canvas.css'
import CanvasBlock from '../canvas-block/canvas-block'
import blocks from '../canvas-block/content'

const Canvas = () => {
  const canvasBlocks = blocks.map(block => {
    return <CanvasBlock key={block.className} content={block} />
  })

  return (
    <div className="canvas-view canvas-horizontal-view">{canvasBlocks}</div>
  )
}

export default Canvas
