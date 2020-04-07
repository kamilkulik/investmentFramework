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
    default:
      return state
  }
};

