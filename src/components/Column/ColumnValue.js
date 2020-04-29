import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setValue } from '../../actions/values';

const ColumnValue = ({ value, valueId, setValue }) => {

const [columnValueState, setValueState] = useState(value);
const elementInput = React.createRef();

const setNewValue = (e) => {
  if (value !== columnValueState && columnValueState) {
    e.preventDefault();
    setValue(columnValueState, valueId);
  } else if (!columnValueState) {
    setValueState(value)
  }
};

const handleValueChange = (e) => {
  const amount = e.target.value;
  if (!amount || amount.match(/^\d{1,}(\.\d{0,5})?$/)) {
    setValueState(amount) 
  } 
}

const onKeyPress = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    elementInput.current.blur();
  }
}

  return (
    <div className='value'>
      <input 
        type='text'
        value={columnValueState}
        onChange={handleValueChange}
        ref={elementInput}
        onKeyDown={onKeyPress}
        onBlur={setNewValue}
      />
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  setValue: (value, valueId) => dispatch(setValue(value, valueId))
});

export default connect(null, mapDispatchToProps)(ColumnValue);