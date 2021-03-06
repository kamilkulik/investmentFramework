import React from "react";
import { connect } from "react-redux";
import { removePhase, renamePhase } from "../../actions/phases";
import ElementCreator from "../DefaultElement/ElementCreator";
import TableContainer from "../../components/Table/TableContainer";
import { addrow } from "../../actions/rows";
import { addColumn } from "../../actions/columns";
import DefaultContainer from "../DefaultElement/DefaultContainer";
import FilterCreator from "../Filters/FilterCreator";
import FilterSausageBar from "../Filters/FilterSausageBar";

const PhaseContainer = ({
  name,
  phaseId,
  removePhase,
  renamePhase,
  rows,
  columns,
  filters,
  addrow,
  addColumn,
  addGenericColumnValue,
}) => {
  return (
    <div className="phase">
      <DefaultContainer
        classNames="phase--header"
        name={name}
        elementId={phaseId}
        phaseId={phaseId}
        removeElement={removePhase}
        renameElement={renamePhase}
      />
      <FilterSausageBar phaseId={phaseId} filters={filters} />
      {rows.length > 0 && (
        <TableContainer phaseId={phaseId} className="phase--table" />
      )}
      <div className="phase--newColumn">
        {rows.length > 0 && (
          <ElementCreator
            phaseId={phaseId}
            classNames=""
            setElementName={addColumn}
            placeholder="Indicator Name"
            addText="Add Indicator"
            btnText="+ Add Indicator"
            columns={columns}
            rows={rows}
            type="column"
          />
        )}
        {columns.length > 0 && (
          <FilterCreator
            phaseId={phaseId}
            classNames={[]}
            titleButton="+ Add new filter"
          />
        )}
      </div>
      {rows.length === 0 && (
        <ElementCreator
          phaseId={phaseId}
          classNames={["phase--newRow"]}
          setElementName={addrow}
          placeholder="Nazwa aktywa"
          addText="Dodaj Aktywo"
          btnText="+ Dodaj Aktywo"
          columns={columns}
          rows={rows}
          addGenericColumnValue={addGenericColumnValue}
          type="row"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  rows: state.rows.filter((row) => row.phaseId === ownProps.phaseId),
  columns: state.columns.filter(
    (column) => column.phaseId === ownProps.phaseId
  ),
  filters: state.filters.filter(
    (filter) => filter.phaseId === ownProps.phaseId
  ),
});

const mapDispatchToProps = (dispatch) => ({
  removePhase: (id) => dispatch(removePhase(id)),
  renamePhase: (name, phaseId) => dispatch(renamePhase(name, phaseId)),
  addrow: (name, phaseId, columns) => dispatch(addrow(name, phaseId, columns)),
  addColumn: (name, phaseId, rows) => dispatch(addColumn(name, phaseId, rows)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhaseContainer);
