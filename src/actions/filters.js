// ADD_FILTER

export const addFilter = (filterName, columnId, type, between) => ({
  type: 'ADD_FILTER',
  filterName,
  columnId,
  type,
  between
});