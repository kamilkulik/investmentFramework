const rowReducerDefaultState = [];

export default (state = rowReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [
        ...state,
        { 
          name: action.name,
          rowId: action.rowId,
          phaseId: action.phaseId
        }
      ]
    case 'ADD_ROWS':
      return [
        ...state,
        ...action.newRows
      ]
    case 'REMOVE_CARD':
      return state.filter(({ rowId }) => rowId !== action.rowId)
    case 'REMOVE_PHASE':
      return state.filter(({ phaseId }) => phaseId !== action.phaseId)
    case 'RENAME_CARD':
      return state.map(( row ) => {
        return row.rowId === action.rowId ? { ...row, name: action.name, rowId: action.rowId } : row
      })
    default:
      return state
  }
};

