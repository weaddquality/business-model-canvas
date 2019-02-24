import React from 'react'
import './Canvas.css'
import CanvasBlock from '../canvas-block/Canvas-block'
import blocks from '../canvas-block/content'

const Canvas = props => {
  const canvasBlocks = blocks.map(block => {
    return <CanvasBlock key={block.className} content={block} />
  })

  return props.isHorizontalViewToggled ? (
    <div className="horizontal-view">{canvasBlocks}</div>
  ) : (
    <div className="canvas-view canvas-horizontal-view">{canvasBlocks}</div>
  )
}

export default Canvas
