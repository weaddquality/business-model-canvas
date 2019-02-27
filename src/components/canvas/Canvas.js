import React, { useState, useEffect } from 'react'
import './Canvas.css'
import CanvasBlock from '../canvas-block/Canvas-block'
import blocks from '../canvas-block/content'
import { API } from 'aws-amplify'

const Canvas = () => {
  const [listResponse, setListResponse] = useState({ items: [] })

  useEffect(() => {
    getItems()
  }, [])

  const getItems = () => {
    API.get('bmc-items', '/bmc-items').then(response => {
      const returnedResponse = {
        items: [
          { header: response[0].ItemHeader, text: response[0].ItemText },
          { header: response[0].ItemHeader, text: response[0].ItemText },
          { header: response[0].ItemHeader, text: response[0].ItemText },
        ],
      }
      setListResponse(returnedResponse)
    })
  }

  const canvasBlocks = blocks.map(block => {
    return <CanvasBlock key={block.className} content={listResponse} />
  })
  return (
    <div>
      <div className="canvas-view canvas-horizontal-view" data-testid="canvasView">
        {canvasBlocks}
      </div>
    </div>
  )
}

export default Canvas
