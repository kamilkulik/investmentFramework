import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeCard, renameCard } from '../../actions/cards';

const CardContainer = ({ name, cardId, phaseId, index, removeCard, renameCard }) => {

  const [cardName, setCardName] = useState(name)
  const [optionsPopover, setOptionsPopover] = useState(false);
  const cardTextArea = React.createRef();

  const changeCardName = (e) => {
    if (cardName !== name) {
      e.preventDefault()
      renameCard(cardName, cardId)
    }
  }

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      cardTextArea.current.blur();
    }
  }

  return (
    <div>
      <form 
      onBlur={changeCardName}
      onKeyDown={onKeyPress}
      >
        <textarea rows='1' cols='20' type='text' style={{ resize: 'none', ':hover': {cursor : 'pointer'}, border: 'none' }} 
        onClick={(e) => e.target.select()}
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        ref={cardTextArea}
        /> 
      </form>
      <button onClick={() => setOptionsPopover(!optionsPopover)}>...</button>
      {optionsPopover && <button onClick={() => removeCard(cardId, phaseId, index)}>X</button> }
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  removeCard: (cardId, phaseId, index) => dispatch(removeCard(cardId, phaseId, index)),
  renameCard: (name, cardId) => dispatch(renameCard(name, cardId))
})

export default connect(null, mapDispatchToProps)(CardContainer);