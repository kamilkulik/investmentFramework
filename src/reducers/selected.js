import { defaultStopLoss } from '../internalAPI/tradeData';
import { roundToTwo } from '../utils/roundingFunc';

const selectedReducerDefaultState = [];

export default (state = selectedReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_SELECTED':
      const rowIds = state.map(el => el.rowId);
      const rows = action.rows.filter(el => !rowIds.includes(el.rowId)).map(el => ({
        name: el.name,
        rowId: el.rowId,
        entryPrice: 0,
        targetPrice: 0,
        stopLossPrice: 0,
        allocatedFunds: 0
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
    case 'SET_ALLOCATED_FUNDS':
      return calcAllocatedFunds(state, action)
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
    } else if (action.defaultStop || action.defaultTake) {
      if (action.defaultStop) { 
        return { ...asset, 
          stopLossPrice: Math.min(
            defaultStopLoss(asset, action.accInfo),
            roundToTwo((asset.entryPrice * ((100 - parseFloat(action.defaultStop)) * 0.01)))
            ) }
      } else { 
        return { ...asset, targetPrice: roundToTwo((asset.entryPrice * ((100 + parseFloat(action.defaultTake)) * 0.01))) } }
    } else {
      return { ...asset }
    }
  });
  return [
    ...updatedState
  ]
}

const calcAllocatedFunds = (state, action) => {
  const alreadyAllocated = state.filter(asset => asset.rowId !== action.rowId).reduce((acc, cur) => acc + cur.allocatedFunds, 0)
  const fundsAllocated = 100 - (alreadyAllocated + action.funds);
  const decreaseFactor = 1 - Math.abs(fundsAllocated / alreadyAllocated);

  let changePerAsset;
  if (state.length > 0 && fundsAllocated < 0) {
    changePerAsset = roundToTwo(decreaseFactor)
  } else if (state.length > 0 && fundsAllocated > 0) {
    changePerAsset = 1;
  } else {
    changePerAsset = 1;
  }

  const updatedState = state.map(asset => {
    if (asset.rowId === action.rowId) {
      return {
        ...asset,
        allocatedFunds: action.funds
      }
    } else {
      return {
        ...asset,
        allocatedFunds: action.funds === 100 ? 0 : Number((Math.max(0, (asset.allocatedFunds * changePerAsset))).toFixed(1))
      }
    }
  })

  return [
    ...updatedState
  ]

}

/*
parseFloat(action.funds)

(asset.allocatedFunds + changePerAsset)

*/