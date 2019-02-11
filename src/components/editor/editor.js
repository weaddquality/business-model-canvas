import React from 'react'
import './editor.css'
import { Link } from 'react-router-dom'
import blocks from '../canvas-block/content'

const Editor = props => {
  const selectedBlock = blocks.find(function(block, index) {
    if (block.className === props.match.params.blockType) {
      block.index = index
      return true
    }
    return false
  })

  const nextBlock = () => {
    if (selectedBlock.index < blocks.length - 1) {
      return blocks[selectedBlock.index + 1].className
    }
  }

  const previousBlock = () => {
    if (selectedBlock.index > 0) {
      return blocks[selectedBlock.index - 1].className
    }
  }

  const previousBlockButton = () => {
    if (selectedBlock.index > 0) {
      return (
        <Link to={`/editor/${previousBlock()}`} className="editor-leftArrow">
          {' '}
          &lt;---{' '}
        </Link>
      )
    }
    return <div className="leftArrow"> &lt;--- </div>
  }
  const nextBlockButton = () => {
    if (selectedBlock.index < blocks.length - 1) {
      return (
        <Link to={`/editor/${nextBlock()}`} className="editor-rightArrow">
          {' '}
          ---&gt;{' '}
        </Link>
      )
    }
    return <div className="rightArrow"> ---&gt; </div>
  }

  const items = selectedBlock.items.map((item, index) => {
    return (
      <div>
        <div className="editor-item-header">{item.header}</div>
        <p key={index}>{item.text}</p>
      </div>
    )
  })

  return (
    <div className="editor-container">
      <h1>{selectedBlock.header}</h1>
      <h2>{selectedBlock.description}</h2>
      <div className="editor-itemContainer">
        {previousBlockButton()}
        <div>{items}</div>
        {nextBlockButton()}
      </div>
      <div>
        <Link to="/canvas">Go back to Canvas</Link>
      </div>
    </div>
  )
}

export default Editor
