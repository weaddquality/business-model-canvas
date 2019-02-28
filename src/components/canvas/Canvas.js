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
          {
            blockHeader: response[0].BlockHeader,
            blockDescription: response[0].BlockDescription,
            itemHeader: response[0].ItemHeader,
            itemText: response[0].ItemText,
          },
          {
            blockHeader: response[1].BlockHeader,
            blockDescription: response[1].BlockDescription,
            itemHeader: response[1].ItemHeader,
            itemText: response[1].ItemText,
          },
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
