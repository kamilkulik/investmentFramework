import { v4 as uuidv4 } from 'uuid';

// ADD_COLUMN

export const addColumn = (name = '', phaseId = '', rows) => {
  
  const columnId = uuidv4();
  
  return (dispatch) => {

    dispatch({
      type: 'ADD_COLUMN',
      name,
      columnId,
      phaseId,
    });

    dispatch({
      type: 'SET_GENERIC_VALUES',
      phaseId,
      columnId,
      rows,
    })
  }
  
};

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

// ADD_GENERIC_COLUMN_VALUE

export const addGenericColumnValue = ( phaseId ) => ({
  type: 'ADD_GENERIC_COLUMN_VALUE',
  phaseId
});

// RENAME_COLUMN

export const renameColumn = (name, columnId) => ({
  type: 'RENAME_COLUMN',
  name,
  columnId
})