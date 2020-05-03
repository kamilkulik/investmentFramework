const accInfoReducerDefaultState = {
  accRisk: 0,
  accSize: 0,
  accCcy: 0,
  minFee: 0,
  floatingFee: 0,
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
    case 'SET_BROKER_FEE_THRESHOLD':
      return {
        ...state,
        feeThreshold: parseFloat(action.feeThreshold)
      }
    default:
      return state
  }
};