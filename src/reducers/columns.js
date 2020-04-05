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
          values: []
        }
      ]
    case 'REMOVE_COLUMN':
      return state.filter(({ columnId }) => columnId !== action.columnId)
    default:
      return state
  }
};

