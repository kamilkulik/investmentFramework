import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeColumn, renameColumn } from '../../actions/columns';
import ColumnValue from '../Column/ColumnValue';
import SmallBtn from '../SmallBtn';
import { v4 as uuidv4 } from 'uuid';

const ColumnContainer = ({ name, columnId, removeColumn, renameColumn, columnValues }) => {

  const [columnName, setColumnName] = useState(name)
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
    <>
    <div className='table--column table--grid-item column--container'>
      <textarea rows='1' cols='10' type='text' 
        onClick={(e) => e.target.select()}
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        ref={columnTextArea}
        onBlur={changeColumnName}
        onKeyDown={onKeyPress}
      /> 
      <SmallBtn onClick={() => removeColumn(columnId)}>X</SmallBtn>
    </div>
      <div className='table--value table--grid-item'>
        {
        columnValues.values.map((value, index) => (
        <div key={uuidv4()}>
          <ColumnValue
            value={value}
            columnId={columnId}
            index={index}
          />
        </div>
      ))
        }
      </div>
  </>)
};

const mapStateToProps = (state, ownProps) => ({
  columnValues: state.columns.find(column => column.columnId === ownProps.columnId)
});

const mapDispatchToProps = dispatch => ({
  removeColumn: (columnId) => dispatch(removeColumn(columnId)),
  renameColumn: (name, columnId) => dispatch(renameColumn(name, columnId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnContainer);