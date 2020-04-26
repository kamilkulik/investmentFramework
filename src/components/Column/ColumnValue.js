import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setValue } from '../../actions/values';

const ColumnValue = ({ value, valueId, setValue }) => {

const [columnValueState, setValueState] = useState(value);

const setNewValue = (e) => {
  if (value !== columnValueState) {
    e.preventDefault();
    setValue(columnValueState, valueId);
  }
};

  return (
    <div className='value'>
      <form onBlur={setNewValue}>
        <input 
          type='text'
          value={columnValueState}
          onChange={(e) => setValueState(e.target.value)}
        />
      </form>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  setValue: (value, valueId) => dispatch(setValue(value, valueId))
});

export default connect(null, mapDispatchToProps)(ColumnValue);