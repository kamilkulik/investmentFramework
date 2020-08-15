const filterReducerDefaultState = [];

export default (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_FILTER":
      return [
        ...state,
        {
          filterId: action.filterId,
          name: action.filterName,
          phaseId: action.phaseId,
          columnId: action.columnId,
          filterType: action.filterType,
          value: action.value,
        },
      ];
    case "REMOVE_FILTER":
      return state.filter(({ filterId }) => filterId !== action.filterId);
    default:
      return state;
  }
};
