import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addColumn } from '../../actions/columns';

const ColumnCreator = ({ addColumn, phaseId }) => {
  const [columnName, setColumnNameState] = useState('');
  
  const setColumn = (e) => {
    e.preventDefault();
    addColumn(columnName, phaseId);
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

const mapDispatchToProps = (dispatch) => ({
  addColumn: (name, phaseId) => dispatch(addColumn(name, phaseId)),
})

export default connect(null, mapDispatchToProps)(ColumnCreator);