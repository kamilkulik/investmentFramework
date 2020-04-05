const phaseReducerDefaultState = [];

export default (state = phaseReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PHASE':
      return [
        ...state,
        { 
          name: action.name,
          phaseId: action.phaseId,
        }
      ]
    case 'REMOVE_PHASE':
      return state.filter(({ phaseId }) => phaseId !== action.phaseId)
    default:
      return state
  }
};