export function setAccountSize(size = 0) {
  return {
    type: 'SET_ACC_SIZE',
    size
  }
}

export function setAccountRisk(risk = 0) {
  return {
    type: 'SET_ACC_RISK',
    risk
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