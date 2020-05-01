const selectedReducerDefaultState = [];

export default (state = selectedReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_SELECTED':
      const rows = action.rows.map(el => ({
        name: el.name,
        rowId: el.rowId,
        noOfShares: 0,
        entryPrice: 0,
        targetPrice: 0,
        stopLossPrice: 0,
      }))
      return [
        ...state,
        ...rows
      ]
    case 'REMOVE_SELECTED_ASSET':
      return state.filter(({ rowId }) => rowId !== action.rowId)
    default:
      return state
  }
};