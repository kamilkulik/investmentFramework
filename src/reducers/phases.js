const phaseReducerDefaultState = [];

export default (state = phaseReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PHASE':
      return [
        ...state,
        { 
          name: action.name,
          id: action.id,
          cards: []
        }
      ]
    case 'ADD_CARD':
      return state.map(phase => {
        if (phase.id !== action.phaseId) {
          return {...phase}
        } else {
          return { 
            name: phase.name,
            id: phase.id,
            cards: [
              ...phase.cards, 
              { 
              name: action.name, 
              id: action.id,
              phaseId: action.phaseId
              }] 
          }
        }
      })
    case 'REMOVE_PHASE':
      return state.filter(({ id }) => id !== action.id)
    case 'REMOVE_CARD':
      return [
        ...state,
        state.find(phase => phase.id === action.id).cards.filter(({ id }) => id !== action.id)
      ]
    default:
      return state
  }
};