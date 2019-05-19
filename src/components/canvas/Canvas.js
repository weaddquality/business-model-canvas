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
    // Set team if not already set
    if (props.selectedTeam.text === 'Select team...') {
      props.handleTeamChange({
        text: props.match.params.team.replace(/-/g, ' '),
        href: `/${props.match.params.team}/canvas`,
      })
      return
    }
    console.log('fetching data on canvas')
    props.getCanvasData()
  }, [props.selectedTeam])

  const canvasBlocks = Object.entries(props.listResponse).map(block => {
    const blockName = block[0]
    const blockData = block[1]
    return (
      <CanvasBlock key={blockData.blockInKebabCase} blockName={blockName} blockData={blockData} />
    )
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
