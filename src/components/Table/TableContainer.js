import React, { useState } from 'react';
import { connect } from 'react-redux';
import ElementCreator from '../DefaultElement/ElementCreator';
import ColumnContainer from '../../components/Column/ColumnContainer';
import { addrow, removerow, renamerow } from '../../actions/rows';
import DefaultContainer from '../DefaultElement/DefaultContainer';
import selectorFunction from '../../selectors/rowSelector';
import DecisionGate from '../DecisionGate/DecisionGate';
import TableContext from './Table-context';

const TableContainer = ({
  phaseId,
  className,
  rows,
  columns,
  filters,
  addrow,
  addGenericColumnValue,
  removerow,
  renamerow,
}) => {
  const [actionFired, fireAction] = useState(false);

  const handleFireAction = () => {
    fireAction(true);
  };

  return (
    <TableContext.Provider value={{ rows, phaseId }}>
      <div className={`${className} table`}>
        <div className='table--rowStart'></div>
        {
          <div className='table--rowName'>
            {rows.map((row, index) => (
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
            ))}
            {filters.length === 0 && (
              <ElementCreator
                phaseId={phaseId}
                classNames='phase--newRow'
                setElementName={addrow}
                placeholder='Add an asset'
                addText='Add Asset'
                btnText='+ Add Another Asset'
                columns={columns}
                addGenericColumnValue={addGenericColumnValue}
                type='row'
              />
            )}
          </div>
        }
        {columns.map((column) => (
          <ColumnContainer
            key={column.columnId}
            name={column.name}
            columnId={column.columnId}
            phaseId={column.phaseId}
            visiableRows={rows}
          />
        ))}
        {filters.length > 0 && actionFired === false && (
          <DecisionGate
            classNames={['table--decision']}
            phaseId={phaseId}
            handleFireAction={handleFireAction}
          />
        )}
      </div>
    </TableContext.Provider>
  );
};

const mapStateToProps = (state, ownProps) => {
  const rows = state.rows.filter((row) => row.phaseId === ownProps.phaseId);
  const columns = state.columns.filter(
    (column) => column.phaseId === ownProps.phaseId
  );
  const filters = state.filters.filter(
    (filter) => filter.phaseId === ownProps.phaseId
  );
  const values = state.values.filter(
    (value) => value.phaseId === ownProps.phaseId
  );
  const visibleRows = selectorFunction(rows, columns, filters, values); // OK
  return {
    rows: visibleRows,
    columns,
    filters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addrow: (name, phaseId, columns) => dispatch(addrow(name, phaseId, columns)),
  removerow: (rowId, phaseId, index) =>
    dispatch(removerow(rowId, phaseId, index)),
  renamerow: (name, rowId) => dispatch(renamerow(name, rowId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
