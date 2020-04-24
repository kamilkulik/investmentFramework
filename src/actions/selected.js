import { v4 as uuidv4 } from 'uuid';

// ADD_SELECTED

export function addSelected(name = '', rows) {
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

// REMOVE_SELECTED

export const removeSelected = ( cardId ) => ({
  type: 'REMOVE_PHASE',
  cardId
})