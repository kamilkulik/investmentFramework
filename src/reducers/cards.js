const cardReducerDefaultState = [];

export default (state = cardReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [
        ...state,
        { 
          name: action.name,
          cardId: action.cardId,
          phaseId: action.phaseId
        }
      ]
    case 'REMOVE_CARD':
      return state.filter(({ cardId }) => cardId !== action.cardId)
    default:
      return state
  }
};

