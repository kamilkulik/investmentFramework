import React from "react";
import { connect } from "react-redux";
import { removeColumn, renameColumn } from "../../actions/columns";
import ColumnValue from "../Column/ColumnValue";
import DefaultContainer from "../DefaultElement/DefaultContainer";
import { v4 as uuidv4 } from "uuid";

const ColumnContainer = ({
  name,
  columnId,
  phaseId,
  removeColumn,
  renameColumn,
  values,
}) => {
  return (
    <React.Fragment>
      <DefaultContainer
        classNames="table--colum table--grid-item column--container"
        name={name}
        elementId={columnId}
        phaseId={phaseId}
        removeElement={removeColumn}
        renameElement={renameColumn}
      />
      <div className="table--value table--grid-item">
        {values.map((value) => {
          return (
            <div key={uuidv4()}>
              <ColumnValue value={value.value} valueId={value.valueId} />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  const rows = state.rows.filter((row) => row.phaseId === ownProps.phaseId);
  const visibleRowsIds = ownProps.visiableRows.map((el) => el.rowId);
  const values = state.values.filter(
    (value) =>
      value.phaseId === ownProps.phaseId &&
      value.columnId === ownProps.columnId &&
      visibleRowsIds.includes(value.rowId)
  );
  return {
    rows,
    values,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeColumn: (columnId) => dispatch(removeColumn(columnId)),
  renameColumn: (name, columnId) => dispatch(renameColumn(name, columnId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnContainer);
