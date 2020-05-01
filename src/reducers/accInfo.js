const accInfoReducerDefaultState = {
  accRisk: 0,
  accSize: 0,
  accCcy: 0,
  minFee: 0,
  floatingFee: 0,
  feeThreshold: 0
};

export default (state = accInfoReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_ACC_SIZE':
      return {
        ...state,
        accSize: action.size
      }
    case 'SET_ACC_RISK':
      return {
        ...state,
        accRisk: action.risk
      }
    case 'SET_BROKER_MIN_FEE':
      return {
        ...state,
        minFee: action.minFee
      }
    case 'SET_BROKER_FLOATING_FEE':
      return {
        ...state,
        floatingFee: action.floatingFee
      }
    case 'SET_BROKER_FEE_THRESHOLD':
      return {
        ...state,
        feeThreshold: action.feeThreshold
      }
    default:
      return state
  }
};