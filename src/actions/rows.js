import { v4 as uuidv4 } from 'uuid';

// ADD_CARD

export const addrow = (name = '', phaseId = '') => ({
  type: 'ADD_CARD',
  name,
  rowId: uuidv4(),
  phaseId
});

// REMOVE_CARD

export const removerow = ( rowId, phaseId, index ) => ({
  type: 'REMOVE_CARD',
  rowId,
  phaseId,
  index
})

// RENAME_CARD

export const renamerow = (name, rowId) => ({
  type: 'RENAME_CARD',
  name,
  rowId
})