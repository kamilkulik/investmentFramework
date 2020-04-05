import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../../actions/cards';

const CardCreator = ({ addCard, phaseId }) => {
  const [CardName, setCardNameState] = useState('');
  
  const setCard = (e) => {
    e.preventDefault();
    addCard(CardName, phaseId);
    setCardNameState('');
  }

  return (
    <div>
      <form onSubmit={setCard}>
        <input 
          placeholder='Wprowadź tytuł aktywa'
          value={CardName}
          onChange={(e) => setCardNameState(e.target.value)}
          />
        <button>Dodaj Aktywo</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addCard: (name, phaseId) => dispatch(addCard(name, phaseId)),
})

export default connect(null, mapDispatchToProps)(CardCreator);