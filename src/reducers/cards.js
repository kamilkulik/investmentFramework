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
    case 'REMOVE_PHASE':
      return state.filter(({ phaseId }) => phaseId !== action.phaseId)
    case 'RENAME_CARD':
      return state.map(( card ) => {
        return card.cardId === action.cardId ? { ...card, name: action.name, cardId: action.cardId } : card
      })
    default:
      return state
  }
};

