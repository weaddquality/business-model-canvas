import React, { useState, useEffect } from 'react'
import './Canvas.css'
import CanvasBlock from '../canvas-block/Canvas-block'
import { API } from 'aws-amplify'

const Canvas = props => {
  const [listResponse, setListResponse] = useState([])
  const testId = props.location.pathname === '/canvas' ? 'canvasView' : 'horizontalView'
  const className =
    props.location.pathname === '/canvas' ? 'canvas-view canvas-horizontal-view' : 'horizontal-view'

  useEffect(() => {
    getItems()
  }, [])

  // TODO: Replace hard coded Team value with a dynamically read value
  const getItems = () => {
    API.get('bmc-items', '/bmc-items/list?Team=Team Continuous').then(response => {
      const { blocks } = response
      setListResponse(blocks)
    })
  }

  const canvasBlocks = listResponse.map(block => {
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
