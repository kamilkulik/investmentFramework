const accInfoReducerDefaultState = {
  accRisk: 0,
  tradeRisk: 0,
  accSize: 0,
  accCcy: 0,
  minFee: 0,
  floatingFee: 0,
  fundsPerTrade: 0,
  proportionalAllocation: true,
  riskPerTrade: false
};

export default (state = accInfoReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_ACC_SIZE':
      return {
        ...state,
        accSize: parseFloat(action.size)
      }
    case 'SET_ACC_RISK':
      return {
        ...state,
        accRisk: parseFloat(action.risk)
      }
    case 'SET_TRADE_RISK':
      return {
        ...state,
        tradeRisk: parseFloat(action.risk)
      }
    case 'SET_BROKER_MIN_FEE':
      return {
        ...state,
        minFee: parseFloat(action.minFee)
      }
    case 'SET_BROKER_FLOATING_FEE':
      return {
        ...state,
        floatingFee: parseFloat(action.floatingFee)
      }
    case 'SET_FUNDS_PER_TRADE':
      return {
        ...state,
        fundsPerTrade: parseFloat(action.fundsPerTrade)
      }
    case 'TOGGLE_PROPORTIONAL_ALLOCATION':
      return {
        ...state,
        proportionalAllocation: !state.proportionalAllocation
      }
    case 'TOGGLE_RISK_PER_TRADE':
      return {
        ...state,
        riskPerTrade: !state.riskPerTrade
      }
    default:
      return state
  }
};