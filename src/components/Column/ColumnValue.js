import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { setValue } from "../../actions/values";

const ColumnValue = ({ value, valueId }) => {
  const dispatch = useDispatch();
  const [columnValueState, setValueState] = useState(value);
  const elementInput = React.createRef();

  const setNewValue = (e) => {
    if (value !== columnValueState && columnValueState) {
      e.preventDefault();
      dispatch(setValue(columnValueState, valueId));
    } else if (!columnValueState) {
      setValueState(value);
    }
  };

  const handleValueChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,5})?$/)) {
      setValueState(amount);
    }
  };

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      elementInput.current.blur();
    }
  };

  console.log("render!");

  return (
    <div className="value">
      <input
        type="text"
        value={columnValueState}
        onChange={handleValueChange}
        ref={elementInput}
        onKeyDown={onKeyPress}
        onBlur={setNewValue}
      />
    </div>
  );
};

export default memo(ColumnValue);
