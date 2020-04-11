import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeColumn, renameColumn } from '../../actions/columns';
import ColumnValue from '../Column/ColumnValue';
import { v4 as uuidv4 } from 'uuid';

const ColumnContainer = ({ name, columnId, removeColumn, renameColumn, columnValues }) => {

  const [columnName, setColumnName] = useState(name)
  const [optionsPopover, setOptionsPopover] = useState(false);
  const columnTextArea = React.createRef();

  const changeColumnName = (e) => {
    if (columnName !== name) {
      e.preventDefault()
      renameColumn(columnName, columnId)
    }
  }

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      columnTextArea.current.blur();
    }
  }

  return (
    <div>
      <form 
        onBlur={changeColumnName}
        onKeyDown={onKeyPress}
        >
        <textarea rows='1' cols='20' type='text' style={{ resize: 'none', ':hover': {cursor : 'pointer'}, border: 'none' }} 
        onClick={(e) => e.target.select()}
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        ref={columnTextArea}
        /> 
      </form>
      <button onClick={() => setOptionsPopover(!optionsPopover)}>...</button>
      {optionsPopover && <button onClick={() => removeColumn(columnId)}>X</button>}
      {columnValues.values.map((value, index) => (
        <div key={uuidv4()}>
          <ColumnValue
            value={value}
            columnId={columnId}
            index={index}
          />
        </div>
      ))}
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  columnValues: state.columns.find(column => column.columnId === ownProps.columnId)
});

const mapDispatchToProps = dispatch => ({
  removeColumn: (columnId) => dispatch(removeColumn(columnId)),
  renameColumn: (name, columnId) => dispatch(renameColumn(name, columnId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnContainer);