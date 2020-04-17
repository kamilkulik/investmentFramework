const filterReducerDefaultState = [];

export default (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      return [
        ...state,
        { 
          name: action.name,
          columnId: action.columnId,
          type: action.type,
          between: action.between
        }
      ]
    default:
      return state
  }
};