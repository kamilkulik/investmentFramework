import { v4 as uuidv4 } from 'uuid';

// ADD_COLUMN

export const addColumn = (name = '', phaseId = '') => ({
  type: 'ADD_COLUMN',
  name,
  columnId: uuidv4(),
  phaseId,
});

// REMOVE_COLUMN

export const removeColumn = ( columnId ) => ({
  type: 'REMOVE_COLUMN',
  columnId
})