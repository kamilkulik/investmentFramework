export function setAccountSize(size = 0) {
  return {
    type: 'SET_ACC_SIZE',
    size
  }
}

export function setAccountRisk(accInfo) {
  return (dispatch) => {

    dispatch({
      type: 'SET_ACC_RISK',
      risk: accInfo.accRisk
    })

    dispatch({
      type: 'RECALCULATE_MIN_STOPLOSS',
      accInfo
    })
  }
}

export function setTradeRisk(accInfo) {
  return (dispatch) => {

    dispatch({
      type: 'SET_TRADE_RISK',
      risk: accInfo.tradeRisk
    })

    dispatch({
      type: 'RECALCULATE_MIN_STOPLOSS',
      accInfo
    })
  }
}

export function setMinBrokerFee(minFee = 0) {
  return {
    type: 'SET_BROKER_MIN_FEE',
    minFee
  }
}

export function setFloatingBrokerFee(floatingFee = 0) {
  return {
    type: 'SET_BROKER_FLOATING_FEE',
    floatingFee
  }
}

export function setFundsPerTrade(fundsPerTrade = 0) {
  return {
    type: 'SET_FUNDS_PER_TRADE',
    fundsPerTrade
  }
}

export function setDefaultStop(accInfo, defaultStop = 0) {
  return (dispatch) => {
  
    dispatch({
      type: 'SET_DEFAULT_STOP_LOSS',
      defaultStop
    })

    dispatch({
      type: 'SET_STOP_LOSS',
      accInfo,
      defaultStop
    })
  }
}

export function setDefaultTake(defaultTake = 0) {
  return (dispatch) => {
    
    dispatch({
      type: 'SET_DEFAULT_TAKE_PROFIT',
      defaultTake
    })

    dispatch({
      type: 'SET_TARGET_PRICE',
      defaultTake
    })
  }
}

export function toggleAllocation() {
  return {
    type: 'TOGGLE_PROPORTIONAL_ALLOCATION',
  }
}

export function toggleRiskPerTrade() {
  return {
    type: 'TOGGLE_RISK_PER_TRADE',
  }
}