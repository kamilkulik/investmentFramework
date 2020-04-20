const columnReducerDefaultState = [];

export default (state = columnReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_COLUMN':
      return [
        ...state,
        { 
          name: action.name,
          columnId: action.columnId,
          phaseId: action.phaseId,
          values: Array(action.initialValuesCount).fill(0)
        }
      ]
    case 'REMOVE_COLUMN':
      return state.filter(({ columnId }) => columnId !== action.columnId)
    case 'SET_COLUMN_VALUE':
      return state.map(column => {
        if (column.columnId === action.columnId) {
          column.values.splice(action.index, 1, action.columnValue);
          return {
            ...column,
            values: column.values
          }
        } else {
          return { ...column }
        }
      })
    case 'ADD_GENERIC_COLUMN_VALUE':
      return state.map(column => {
        if (column.phaseId === action.phaseId) {
          column.values.push(0);
          return {
            ...column,
            values: column.values
          }
        } else {
          return { ...column }
        }
      }) 
    case 'REMOVE_CARD':
      return removerow(state, action)
    case 'REMOVE_PHASE':
      return state.filter(({ phaseId }) => phaseId !== action.phaseId)
    case 'RENAME_COLUMN':
      return state.map(( column ) => {
        return column.columnId === action.columnId ? { ...column, name: action.name, columnId: action.columnId } : column
      })
    default:
      return state
  }
};

function removerow(state, action) {
  const columnsWithAdjustedValues = state.map(column => {
    if (column.phaseId === action.phaseId) {
      column.values.splice(action.index, 1);
        return {
          ...column,
          values: column.values
        }
    } else {
      return { ...column }
    }
  });
  const newState = columnsWithAdjustedValues.filter(({ values }) => values.length > 0)
  return newState
}