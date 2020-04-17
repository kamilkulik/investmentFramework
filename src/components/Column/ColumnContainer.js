import React from 'react';
import { connect } from 'react-redux';
import { removeColumn, renameColumn } from '../../actions/columns';
import ColumnValue from '../Column/ColumnValue';
import DefaultContainer from '../DefaultElement/DefaultContainer';
import { v4 as uuidv4 } from 'uuid';

const ColumnContainer = ({ name, columnId, phaseId, removeColumn, renameColumn, columnValues }) => {

  return (
    <>
      <DefaultContainer
        classNames={['table--colum', 'table--grid-item', 'column--container']}
        name={name}
        elementId={columnId}
        phaseId={phaseId}
        removeElement={removeColumn}
        renameElement={renameColumn}
      />
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