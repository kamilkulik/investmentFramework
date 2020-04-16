import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setColumnValue } from '../../actions/columns';

const ColumnValue = ({ value, columnId, index, setColumnValue }) => {

const [columnValueState, setColumnValueState] = useState(value);

const setValue = (e) => {
  if (value !== columnValueState) {
    e.preventDefault();
    setColumnValue(columnId, index, columnValueState);
  }
};

  return (
    <div className='value'>
      <form onBlur={setValue}>
        <input 
          type='text'
          value={columnValueState}
          onChange={(e) => setColumnValueState(e.target.value)}
        />
      </form>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  setColumnValue: (columnId, index, columnValue) => dispatch(setColumnValue(columnId, index, columnValue))
});

export default connect(null, mapDispatchToProps)(ColumnValue);