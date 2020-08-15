const accInfoReducerDefaultState = {
  accCcy: 0,
  accRisk: 0,
  accSize: 0,
  defaultStop: 0,
  defaultTake: 0,
  floatingFee: 0,
  fundsPerTrade: 0,
  minFee: 0,
  proportionalAllocation: true,
  riskPerTrade: false,
  tradeRisk: 0,
};

export default (state = accInfoReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_ACC_SIZE":
      return {
        ...state,
        accSize: parseFloat(action.size),
      };
    case "SET_ACC_RISK":
      return {
        ...state,
        accRisk: parseFloat(action.risk),
      };
    case "SET_TRADE_RISK":
      return {
        ...state,
        tradeRisk: parseFloat(action.risk),
      };
    case "SET_BROKER_MIN_FEE":
      return {
        ...state,
        minFee: parseFloat(action.minFee),
      };
    case "SET_BROKER_FLOATING_FEE":
      return {
        ...state,
        floatingFee: parseFloat(action.floatingFee),
      };
    case "SET_FUNDS_PER_TRADE":
      return {
        ...state,
        fundsPerTrade: parseFloat(action.fundsPerTrade),
      };
    case "TOGGLE_PROPORTIONAL_ALLOCATION":
      return {
        ...state,
        proportionalAllocation: !state.proportionalAllocation,
      };
    case "TOGGLE_RISK_PER_TRADE":
      return {
        ...state,
        riskPerTrade: !state.riskPerTrade,
      };
    case "SET_DEFAULT_STOP_LOSS":
      return {
        ...state,
        defaultStop: parseFloat(action.defaultStop),
      };
    case "SET_DEFAULT_TAKE_PROFIT":
      return {
        ...state,
        defaultTake: parseFloat(action.defaultTake),
      };
    default:
      return state;
  }
};
