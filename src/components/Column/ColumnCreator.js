import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addColumn } from '../../actions/columns';

const ColumnCreator = ({ addColumn, phaseId, relevantCards }) => {
  const [columnName, setColumnNameState] = useState('');
  
  const setColumn = (e) => {
    e.preventDefault();
    let initialValuesCount = relevantCards.length;
    addColumn(columnName, phaseId, initialValuesCount);
    setColumnNameState('');
  }

  return (
    <div>
      <form onSubmit={setColumn}>
        <input 
          placeholder='Wprowadź tytuł wskaźnika'
          value={columnName}
          onChange={(e) => setColumnNameState(e.target.value)}
          />
        <button>Dodaj Wskaźnik</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  relevantCards: state.cards.filter(card => card.phaseId === ownProps.phaseId)
})

const mapDispatchToProps = (dispatch) => ({
  addColumn: (name, phaseId, initialValuesCount) => dispatch(addColumn(name, phaseId, initialValuesCount)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ColumnCreator);