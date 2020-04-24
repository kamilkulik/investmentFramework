const selectedReducerDefaultState = [];

export default (state = selectedReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_SELECTED':
      return [
        ...state,
        { 
          name: action.name,
          phaseId: action.phaseId,
          cardId: action.cardId,
        }
      ]
    case 'REMOVE_SELECTED':
      return state.filter(({ cardId }) => cardId !== action.cardId)
    default:
      return state
  }
};