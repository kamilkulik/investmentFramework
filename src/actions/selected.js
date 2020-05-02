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

export const setEntryPrice = (rowId, entryPrice = 0) => ({
    type: 'SET_ENTRY_PRICE',
    rowId,
    price: entryPrice
})

export const setTargetPrice = (rowId, targetPrice = 0) => ({
  type: 'SET_TARGET_PRICE',
  rowId,
  price: targetPrice
})

export const setStopLoss = (rowId, stopLossPrice = 0) => ({
  type: 'SET_STOP_LOSS',
  rowId,
  price: stopLossPrice
})

export const setTradeData = (rowId, tradeData) => ({
  type: 'SET_TRADE_DATA',
  rowId,
  tradeData
})