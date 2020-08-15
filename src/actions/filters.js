import { v4 as uuidv4 } from "uuid";

// ADD_FILTER

export const addFilter = (
  filterName,
  phaseId,
  columnId,
  filterType,
  value
) => ({
  type: "ADD_FILTER",
  filterId: uuidv4(),
  filterName,
  phaseId,
  columnId,
  filterType,
  value,
});

// REMOVE_FILTER

export const removeFilter = (filterId) => ({
  type: "REMOVE_FILTER",
  filterId,
});

// EDIT_FILTER

export const editFilter = (filterId) => ({
  type: "EDIT_FILTER",
  filterId,
});
