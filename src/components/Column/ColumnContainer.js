import React from 'react';
import { connect } from 'react-redux';
import { removeColumn } from '../../actions/columns';
import ColumnValue from '../Column/ColumnValue';
import { v4 as uuidv4 } from 'uuid';

const ColumnContainer = ({ name, columnId, removeColumn, columnValues }) => {

  return (
    <div>
      <h6>{name}</h6>
      <button onClick={() => removeColumn(columnId)}>X</button>
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
  removeColumn: (columnId) => dispatch(removeColumn(columnId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnContainer);