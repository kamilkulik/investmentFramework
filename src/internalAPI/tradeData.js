// function that calculates trade details for a single asset
export const calcTradeData = (rowId, accInfo, selected) => {
  const { accRisk, accSize, minFee, floatingFee } = accInfo;
  const { entryPrice, targetPrice, stopLossPrice } = selected.find(el => el.rowId === rowId);

  const floatingFeeDecimal = floatingFee * 0.01;
  const lossPerShare = 0 - (entryPrice - stopLossPrice);
  const profitPerShare = targetPrice - entryPrice;
  const noOfShares = - (Math.floor(((accRisk * 10 ** (-2)) * accSize) / lossPerShare));
  const feeThreshold = minFee / floatingFeeDecimal;
  const entryPriceFee = - (noOfShares * entryPrice < feeThreshold ? minFee : entryPrice * noOfShares * floatingFeeDecimal);
  const targetPriceFee = - (noOfShares * targetPrice < feeThreshold ? minFee : targetPrice * noOfShares * floatingFeeDecimal);
  const stopLosstPriceFee = - (noOfShares * stopLossPrice < feeThreshold ? minFee : stopLossPrice * noOfShares * floatingFeeDecimal);
  const maxLoss = Math.floor((noOfShares * lossPerShare) + (entryPriceFee + stopLosstPriceFee));
  const estimatedTradeProfit = Math.floor((noOfShares * profitPerShare) + (entryPriceFee + targetPriceFee));
  const positionValue = Math.floor(noOfShares * entryPrice)
  const returnRiskRatio = - (parseFloat((profitPerShare/lossPerShare).toFixed(1)));

  return {
    lossPerShare,
    profitPerShare,
    noOfShares,
    maxLoss,
    estimatedTradeProfit,
    positionValue,
    returnRiskRatio,
    entryPriceFee,
    targetPriceFee,
    stopLosstPriceFee
  }
}

// function for the accInfo components. Provides total numbers for the entire account
export const summaryData = (accInfo, selected) => {
  let allTradeInfo = selected.map(asset => {
    return calcTradeData(asset.rowId, accInfo, selected)
  });

  let estimatedTotalProfit,maxTotalLoss, accReturnRiskRatio, fundsToAllocate, fundsCommitted;
  if (allTradeInfo.length > 0) {
    estimatedTotalProfit = allTradeInfo.reduce((acc, cur) => acc + cur.estimatedTradeProfit, 0);
    maxTotalLoss = allTradeInfo.reduce((acc, cur) => acc + cur.maxLoss, 0);
    accReturnRiskRatio =  - parseFloat((estimatedTotalProfit / maxTotalLoss).toFixed(1));
    const totalAllocatedFunds = allTradeInfo.reduce((acc, cur) => acc + cur.positionValue, 0);
    fundsToAllocate = accInfo.accSize - totalAllocatedFunds;
    fundsCommitted = allTradeInfo.reduce((acc, cur) => acc + cur.positionValue, 0);
  } else {
    estimatedTotalProfit = 0;
    maxTotalLoss = 0; 
    accReturnRiskRatio = 0; 
    fundsToAllocate = 0;
    fundsCommitted = 0
  }

  return {
    estimatedTotalProfit,
    maxTotalLoss,
    accReturnRiskRatio,
    fundsToAllocate,
    fundsCommitted
  }
}

// functin for getting the amount of shares per trade
export const calculateShares = (accInfo, asset) => {
  const { accRisk, accSize } = accInfo;
  const { entryPrice, stopLossPrice } = asset;
  const lossPerShare = 0 - (entryPrice - stopLossPrice);
  const noOfShares = - (Math.floor(((accRisk * 10 ** (-2)) * accSize) / lossPerShare));

  return {
    noOfShares
  }
}