import { v4 as uuidv4 } from 'uuid';

// ADD_VALUE

export const addrow = (name = '', phaseId = '') => ({
  type: 'ADD_CARD',
  name,
  rowId: uuidv4(),
  phaseId
});

// REMOVE_VALUE

export const removerow = ( rowId, phaseId, index ) => ({
  type: 'REMOVE_CARD',
  rowId,
  phaseId,
  index
})

// SET_VALUE

export const setValue = (phaseId, rowId, columnId, value) => ({
  type: 'SET_VALUE',
  phaseId,
  rowId,
  columnId,
  value,
})