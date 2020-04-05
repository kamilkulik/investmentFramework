const cardReducerDefaultState = [];

export default (state = cardReducerDefaultState, action) => {
  switch (action.type) {
    // case 'ADD_CARD':
    //   return state.phases.find(el => el.id === action.phaseId).cards.push({ 
    //       name: action.name,
    //       id: action.id,
    //     })
    case 'REMOVE_CARD':
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }
};

