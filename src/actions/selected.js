import { v4 as uuidv4 } from 'uuid';

export const nextPhase = (name = '', rows) => {
  return (dispatch) => {
    const phaseId = uuidv4();
    const newRows = rows.map(row => {
      return { ...row, phaseId }
    })

    dispatch({
      type: 'ADD_PHASE',
      name,
      phaseId
    });

    dispatch({ 
      type: 'ADD_ROWS',
      newRows
    });
  }
}; 

export const addToPositionSizing = (rows) => ({
  type: 'ADD_SELECTED',
  rows
})

export const removeAsset = (rowId) => ({
  type: 'REMOVE_SELECTED_ASSET',
  rowId
})