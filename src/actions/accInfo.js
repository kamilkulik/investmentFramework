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