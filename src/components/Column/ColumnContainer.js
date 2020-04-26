import React from 'react';
import { connect } from 'react-redux';
import { removeColumn, renameColumn } from '../../actions/columns';
import ColumnValue from '../Column/ColumnValue';
import DefaultContainer from '../DefaultElement/DefaultContainer';
import { v4 as uuidv4 } from 'uuid';

const ColumnContainer = ({ name, columnId, phaseId, removeColumn, renameColumn, rows, values }) => {

  return (
    <React.Fragment>
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
        values.map((value, index) => {
          return (
            <div key={uuidv4()}>
              <ColumnValue
                value={value.value}
                valueId={value.valueId}
                index={index}
              />
            </div>)
          })
        }
      </div>
  </React.Fragment>)
};

const mapStateToProps = (state, ownProps) => {
  const rows = state.rows.filter((row) => row.phaseId === ownProps.phaseId);
  // const column = state.columns.find(column => column.columnId === ownProps.columnId); // OK
  const values = state.values.filter(value => value.phaseId === ownProps.phaseId && value.columnId === ownProps.columnId);
  // const visibleColumnValues = () => {
  //   const values = column.values.filter((value, index) => ownProps.visibleValues.includes(index));
  //   return {...column, values};
  // }
  return {
    rows,
    // columnValues: column.values.length > 1 ? visibleColumnValues() : column,
    values
  }
};

const mapDispatchToProps = dispatch => ({
  removeColumn: (columnId) => dispatch(removeColumn(columnId)),
  renameColumn: (name, columnId) => dispatch(renameColumn(name, columnId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnContainer);