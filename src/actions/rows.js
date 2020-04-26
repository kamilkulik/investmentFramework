import { v4 as uuidv4 } from 'uuid';

// ADD_ROW

export const addrow = (name = '', phaseId = '', columns) => {
  return (dispatch ) => {

    const rowId = uuidv4();

    dispatch({
      type: 'ADD_ROW',
      name,
      rowId,
      phaseId
    })

    dispatch({
      type: 'ADD_GENERIC_ROW_VALUES',
      phaseId,
      rowId,
      columns,
    })
  }
};

// REMOVE_ROW

export const removerow = ( rowId, phaseId, index ) => ({
  type: 'REMOVE_ROW',
  rowId,
  phaseId,
  index
})

// RENAME_ROW

export const renamerow = (name, rowId) => ({
  type: 'RENAME_ROW',
  name,
  rowId
})