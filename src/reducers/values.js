import { v4 as uuidv4 } from "uuid";
const valueReducerDefaultState = [];

export default (state = valueReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return state.map((stateValue) => {
        if (stateValue.valueId === action.valueId) {
          return {
            ...stateValue,
            value: action.value,
          };
        } else {
          return {
            ...stateValue,
          };
        }
      });
    case "ADD_GENERIC_COLUMN_VALUE":
      return state.map((column) => {
        if (column.phaseId === action.phaseId) {
          column.values.push(0);
          return {
            ...column,
            values: column.values,
          };
        } else {
          return { ...column };
        }
      });
    case "SET_GENERIC_VALUES":
      return addGenericValues(state, action);
    case "REMOVE_ROW":
      return state.filter((value) => value.rowId !== action.rowId);
    case "REMOVE_COLUMN":
      return state.filter((value) => value.columnId !== action.columnId);
    case "REMOVE_PHASE":
      return state.filter((value) => value.phaseId !== action.phaseId);
    case "ADD_GENERIC_ROW_VALUES":
      return addGenericRowValues(state, action);
    case "REMOVE_VALUE":
      return state.filter(({ valueId }) => valueId !== action.valueId);
    default:
      return state;
  }
};

const addGenericValues = (state, action) => {
  const newValues = action.rows.map((row) => {
    return {
      phaseId: action.phaseId,
      rowId: row.rowId,
      columnId: action.columnId,
      value: 0,
      valueId: uuidv4(),
    };
  });
  return [...state, ...newValues];
};

const addGenericRowValues = (state, action) => {
  const newColumnValues = action.columns.map((column) => {
    return {
      phaseId: action.phaseId,
      rowId: action.rowId,
      columnId: column.columnId,
      value: 0,
      valueId: uuidv4(),
    };
  });
  return [...state, ...newColumnValues];
};
