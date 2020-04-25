import React, { useState } from 'react';
import { connect } from 'react-redux';
import ElementCreator from '../DefaultElement/ElementCreator';
import ColumnContainer from '../../components/Column/ColumnContainer';
import { addrow, removerow, renamerow } from '../../actions/rows';
import { addGenericColumnValue } from '../../actions/columns';
import DefaultContainer from '../DefaultElement/DefaultContainer';
import selectorFunction from '../../selectors/rowSelector';
import DecisionGate from '../DecisionGate/DecisionGate';
import TableContext from './Table-context';

const TableContainer = ({ phaseId, className, rows, columns, filters, addrow, addGenericColumnValue, removerow, renamerow, visibleValues }) => {
  
  const [actionFired, fireAction] = useState(false);

  const handleFireAction = () => {
    fireAction(true)
  }
  
  return (
    <TableContext.Provider value={{ rows, phaseId }}>
    <div className={`${className} table`}>
      <div className='table--rowStart'></div>
      {<div className='table--rowName'>{
        rows.map((row, index) => (
          <div key={row.rowId} className='row--container'>
            <DefaultContainer
              name={row.name}
              elementId={row.rowId}
              phaseId={row.phaseId}
              index={index}
              removeElement={removerow}
              renameElement={renamerow}
            />
          </div>
        ))
        }
        <ElementCreator
          phaseId={phaseId}
          classNames={['phase--newRow']}
          setElementName={addrow} 
          placeholder='Nazwa aktywa' 
          addText='Dodaj Aktywo' 
          btnText='+ Dodaj Kolejne Aktywo' 
          columns={columns} 
          addGenericColumnValue={addGenericColumnValue}
          type='row'
        />
        </div>
      }
      {columns.map(column => (
        <ColumnContainer 
          key={column.columnId}
          name={column.name}
          columnId={column.columnId}
          phaseId={column.phaseId}
          visibleValues={visibleValues}
        />
        ))
      }
      {filters.length > 0 && actionFired === false &&
        <DecisionGate 
        classNames={['table--decision']} 
        phaseId={phaseId}
        handleFireAction={handleFireAction}/>}
    </div>
    </TableContext.Provider>
  )
}

const mapStateToProps = (state, ownProps) => {
  const rows = state.rows.filter((row) => row.phaseId === ownProps.phaseId);
  const columns = state.columns.filter((column) => column.phaseId === ownProps.phaseId);
  const filters = state.filters.filter((filter) => filter.phaseId === ownProps.phaseId);
  const visibleRows = selectorFunction(rows, columns, filters);  // OK
  let valuesArray = [];
  rows.forEach(row => visibleRows.forEach(vRow => vRow === row ? valuesArray.push(rows.indexOf(row)) : ''));
  return {
    rows: visibleRows,
    columns,
    filters,
    visibleValues: valuesArray
}}

const mapDispatchToProps = dispatch => ({
  addrow: (name, phaseId) => dispatch(addrow(name, phaseId)),
  removerow: (rowId, phaseId, index) => dispatch(removerow(rowId, phaseId, index)),
  renamerow: (name, rowId) => dispatch(renamerow(name, rowId)),
  addGenericColumnValue: (phaseId) => dispatch(addGenericColumnValue(phaseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);