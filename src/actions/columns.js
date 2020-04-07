import { v4 as uuidv4 } from 'uuid';

// ADD_COLUMN

export const addColumn = (name = '', phaseId = '', initialValuesCount = 0) => ({
  type: 'ADD_COLUMN',
  name,
  columnId: uuidv4(),
  phaseId,
  initialValuesCount
});

// REMOVE_COLUMN

export const removeColumn = ( columnId ) => ({
  type: 'REMOVE_COLUMN',
  columnId
});

// SET_COLUMN_VALUE

export const setColumnValue = ( columnId, index, columnValue ) => ({
  type: 'SET_COLUMN_VALUE',
  columnId,
  index,
  columnValue
});