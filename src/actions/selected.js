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

export const setTradeData = (rowId, tradeData) => ({
  type: 'SET_TRADE_DATA',
  rowId,
  tradeData
})

export const setPrice = (type, rowId, price = 0) => {
  let actionType;
  if (type === 'entryPrice') {
    actionType = 'SET_ENTRY_PRICE'
  } else if (type === 'targetPrice') {
    actionType = 'SET_TARGET_PRICE'
  } else if (type === 'stopLossPrice') {
    actionType = 'SET_STOP_LOSS'
  }
  return {
    type: actionType,
    rowId,
    price
  }
}
  
export const addAsset = (name) => {
  const rows = [{
    name,
    rowId: uuidv4()
  }]
  return {
    type: 'ADD_SELECTED',
    rows
  }
}

export const setFunds = (rowId, funds) => ({
  type: 'SET_ALLOCATED_FUNDS',
  rowId,
  funds: parseFloat(funds)
})