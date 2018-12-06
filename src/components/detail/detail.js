import React from 'react';
import './detail.css'
import { Link } from 'react-router-dom'
import blocks from '../area/content';

const Detail = (props) => {
  const selectedBlock = blocks.find(function (block, index) {
    if (block.className === props.match.params.blockType) {
      block.index = index
      return true
    }
    return false
  })
  const nextBlock = function () {
    if (selectedBlock.index < blocks.length - 1) {
      return blocks[selectedBlock.index + 1].className;
    }
  }

  const previousBlock = function () {
    if (selectedBlock.index > 0) {
      return blocks[selectedBlock.index - 1].className;
    }
  }

  const items = selectedBlock.items.map((item, index) => {
    return <p key={index}>{item}</p>
  })

  return (
    <div>
      <h1>{selectedBlock.header}</h1>
      <h2>{selectedBlock.description}</h2>
      <div className="itemContainer">
        {selectedBlock.index > 0 ? <Link to={`/detail/${previousBlock()}`} className="leftArrow">"VÄNSTERPILEN"</Link> : <div>"VÄNSTERPILEN"</div>}
        <div className="items">{items}</div>
        {selectedBlock.index < blocks.length - 1 ? <Link to={`/detail/${nextBlock()}`} className="rightArrow">"HÖGERPILEN"</Link> : <div>"HÖGERPILEN"</div>}
      </div>
      <div>
        <Link to="/">
          Go back to grid
        </Link>
      </div>
    </div>

  )
}

export default Detail;
