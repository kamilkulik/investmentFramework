const rowReducerDefaultState = [];

export default (state = rowReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [
        ...state,
        {
          name: action.name,
          rowId: action.rowId,
          phaseId: action.phaseId,
        },
      ];
    case "ADD_ROWS":
      return [...state, ...action.newRows];
    case "REMOVE_ROW":
      return state.filter(({ rowId }) => rowId !== action.rowId);
    case "REMOVE_PHASE":
      return state.filter(({ phaseId }) => phaseId !== action.phaseId);
    case "RENAME_ROW":
      return state.map((row) => {
        return row.rowId === action.rowId
          ? { ...row, name: action.name, rowId: action.rowId }
          : row;
      });
    default:
      return state;
  }
};
