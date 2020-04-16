import React, { useState } from 'react';
import SmallBtn from '../SmallBtn';
import { connect } from 'react-redux';
import { removeCard, renameCard } from '../../actions/cards';

const CardContainer = ({ name, cardId, phaseId, index, removeCard, renameCard, smallButton = true }) => {

  const [cardName, setCardName] = useState(name)
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

  const classNames = [];
  if (smallButton) {
    classNames.push('smallBtn')
  }

  return (
    <>
      <textarea name='rowName' rows='1' cols='10' wrap='off' type='text' style={{ resize: 'none', border: 'none' }} 
      onClick={(e) => e.target.select()}
      value={cardName}
      onChange={(e) => setCardName(e.target.value)}
      ref={cardTextArea}
      onBlur={changeCardName}
      onKeyDown={onKeyPress}
      /> 
      <SmallBtn onClick={() => removeCard(cardId, phaseId, index)}>X</SmallBtn>
    </>
  )
};

const mapDispatchToProps = dispatch => ({
  removeCard: (cardId, phaseId, index) => dispatch(removeCard(cardId, phaseId, index)),
  renameCard: (name, cardId) => dispatch(renameCard(name, cardId))
})

export default connect(null, mapDispatchToProps)(CardContainer);