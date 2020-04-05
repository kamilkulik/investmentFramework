import React from 'react';
import { connect } from 'react-redux';
import { removeCard } from '../../actions/cards';

const CardContainer = ({ name, cardId, removeCard }) => {
  return (
    <div>
      <h6>{name}</h6>
      <button onClick={() => removeCard(cardId)}>X</button>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  removeCard: (cardId) => dispatch(removeCard(cardId))
})

export default connect(null, mapDispatchToProps)(CardContainer);