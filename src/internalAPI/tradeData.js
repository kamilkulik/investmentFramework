export const calcTradeData = (rowId, accInfo, selected) => {
  const { accRisk, accSize, minFee, floatingFee, feeThreshold } = accInfo;
  const { entryPrice, targetPrice, stopLossPrice } = selected.find(el => el.rowId === rowId);

  const lossPerShare = entryPrice - stopLossPrice;
  const profitPerShare = targetPrice - entryPrice;
  const noOfShares = Math.floor(((accRisk * 10 ** (-2)) * accSize) / lossPerShare);
  const maxLoss = Math.floor(noOfShares * lossPerShare);
  const estimatedTradeProfit = Math.floor(noOfShares * profitPerShare);
  const positionValue = Math.floor(noOfShares * entryPrice)
  const returnRiskRatio = (profitPerShare/lossPerShare).toFixed(1)

  return {
    lossPerShare,
    profitPerShare,
    noOfShares,
    maxLoss,
    estimatedTradeProfit,
    positionValue,
    returnRiskRatio
  }
}