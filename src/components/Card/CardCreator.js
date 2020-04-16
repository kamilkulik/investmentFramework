import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../../actions/cards';
import { addGenericColumnValue } from '../../actions/columns';

const CardCreator = ({ addCard, phaseId, addGenericColumnValue, columns = [] }) => {
  const [CardName, setCardNameState] = useState('');
  
  const setCard = (e) => {
    e.preventDefault();
    addCard(CardName, phaseId);
    columns.length > 0 && addGenericColumnValue(phaseId);
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
        <button className='creator--button'>Dodaj Aktywo</button>
      </form>
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  columns: state.columns.filter(column => column.phaseId === ownProps.phaseId)
})

const mapDispatchToProps = (dispatch) => ({
  addCard: (name, phaseId) => dispatch(addCard(name, phaseId)),
  addGenericColumnValue: (phaseId) => dispatch(addGenericColumnValue(phaseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardCreator);