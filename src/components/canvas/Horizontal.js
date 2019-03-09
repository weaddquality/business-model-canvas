import React, { useState, useEffect } from 'react'
import './Canvas.css'
import CanvasBlock from '../canvas-block/Canvas-block'
import { API } from 'aws-amplify'

const Horizontal = () => {
  const [listResponse, setListResponse] = useState([])

  useEffect(() => {
    getItems()
  }, [])

  // TODO: Replace hard coded Team value with a dynamically read value
  const getItems = () => {
    API.get('bmc-items', 'bmc-items/list?Team=Team Continuous').then(response => {
      const { blocks } = response
      setListResponse(blocks)
    })
  }

  const canvasBlocks = listResponse.map(block => {
    const className = block.block.toLowerCase().replace(' ', '-')
    return <CanvasBlock key={className} content={block} />
  })
  return (
    <div className="horizontal-view" data-testid="horizontalView">
      {canvasBlocks}
    </div>
  )
}

export default Horizontal
