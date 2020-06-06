// import { v4 as uuidv4 } from 'uuid';

// REMOVE_VALUE

export const removerow = (rowId, phaseId, index) => ({
  type: "REMOVE_ROW",
  rowId,
  phaseId,
  index,
});

// SET_VALUE

export const setValue = (value = 0, valueId) => ({
  type: "SET_VALUE",
  value,
  valueId,
});
