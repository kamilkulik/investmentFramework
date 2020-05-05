import { defaultStopLoss } from '../internalAPI/tradeData';

const selectedReducerDefaultState = [];

export default (state = selectedReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_SELECTED':
      const rows = action.rows.map(el => ({
        name: el.name,
        rowId: el.rowId,
        entryPrice: 0,
        targetPrice: 0,
        stopLossPrice: 0,
      }))
      return [
        ...state,
        ...rows
      ]
    case 'REMOVE_SELECTED_ASSET':
      return state.filter(({ rowId }) => rowId !== action.rowId)
    case 'SET_ENTRY_PRICE':
      return setPrice(state, action)
    case 'SET_TARGET_PRICE':
      return setPrice(state, action)
    case 'SET_STOP_LOSS':
      return setPrice(state, action)
    case 'RECALCULATE_MIN_STOPLOSS':
      return state.map(asset => {
        const defaultPrice = defaultStopLoss(asset, action.accInfo);
        const revisedPrice = asset.stopLossPrice > defaultPrice ? defaultPrice : asset.stopLossPrice;
        return {
          ...asset,
          stopLossPrice: revisedPrice
        }
      })
    case 'SET_TRADE_DATA':
      return state.map(asset => {
        if (asset.rowId === action.rowId) {
          return {
            ...asset,
            noOfShares: action.tradeData.noOfShares,
            maxLoss: action.tradeData.maxLoss,
            estimatedTradeProfit: action.tradeData.estimatedTradeProfit,
            positionValue: action.tradeData.positionValue,
          }
        } else {
          return { ...asset }
        }
      })
    default:
      return state
  }
};

const setPrice = (state, action) => {
  const updatedState = state.map(asset => {
    if (asset.rowId === action.rowId) {
      let updatedAsset;
      switch (action.type) {
        case 'SET_ENTRY_PRICE':
          updatedAsset = { ...asset, entryPrice: parseFloat(action.price)};
          break;
        case 'SET_TARGET_PRICE':
          updatedAsset =  { ...asset, targetPrice: parseFloat(action.price)};
          break;
        case 'SET_STOP_LOSS':
          updatedAsset = { ...asset, stopLossPrice: parseFloat(action.price)};
          break;
        default:
          updatedAsset = asset;
      }
      return { ...updatedAsset }
    } else {
      return { ...asset }
    }
  });
  return [
    ...updatedState
  ]
}