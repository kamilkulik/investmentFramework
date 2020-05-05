import { roundToTwo } from '../utils/roundingFunc';

// TODO - break everything into separate functions

// function that calculates default stop loss. Returns a number

export const defaultStopLoss = (asset, accInfo) => {
  const { noOfShares } = calculateShares(accInfo, asset);
  const { entryPriceFee, stopLossPriceFee } = calculateFees(accInfo, noOfShares, asset);
  const feesPerShare = (entryPriceFee + stopLossPriceFee) / noOfShares;
  return roundToTwo((asset.entryPrice * ((100 - accInfo.accRisk) * 0.01)) - feesPerShare) ;
}

// function that calculates trade details for a single asset
export const calcTradeData = (rowId, accInfo, selected) => {

  const { entryPrice, targetPrice, stopLossPrice } = selected.find(el => el.rowId === rowId);
  const prices = { entryPrice, targetPrice, stopLossPrice };

  const { noOfShares } = shareCalcEngine(accInfo, selected).find(el => el.rowId === rowId)
  const { entryPriceFee, targetPriceFee, stopLossPriceFee } = calculateFees(accInfo, noOfShares, prices)

  const lossPerShare = roundToTwo(stopLossPrice - entryPrice);
  const profitPerShare = roundToTwo(targetPrice - entryPrice);
  const maxLoss = noOfShares === 0 ? 0 : roundToTwo((noOfShares * lossPerShare) + (entryPriceFee + stopLossPriceFee));
  const estimatedTradeProfit = noOfShares === 0 ? 0 : roundToTwo((noOfShares * profitPerShare) + (entryPriceFee + targetPriceFee));
  const positionValue = roundToTwo(noOfShares * entryPrice)
  const returnRiskRatio = profitPerShare === 0 & lossPerShare === 0 ? 0 : - (roundToTwo(profitPerShare/lossPerShare));

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
    stopLossPriceFee
  }
}

// function for the accInfo components. Provides total numbers for the entire account
export const summaryData = (accInfo, selected) => {
  const allTradeInfo = selected.map(asset => {
    return calcTradeData(asset.rowId, accInfo, selected)
  });

  let estimatedTotalProfit,maxTotalLoss, accReturnRiskRatio, fundsToAllocate, fundsCommitted;
  if (allTradeInfo.length > 0) {
    estimatedTotalProfit = roundToTwo(allTradeInfo.reduce((acc, cur) => acc + cur.estimatedTradeProfit, 0));
    maxTotalLoss = roundToTwo(allTradeInfo.reduce((acc, cur) => acc + cur.maxLoss, 0));
    accReturnRiskRatio =  estimatedTotalProfit === 0 && maxTotalLoss === 0 ? 0 : - roundToTwo(estimatedTotalProfit / maxTotalLoss);
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

// function for getting the amount of shares per trade across entire account
// TODO: include entryPriceFee

export const shareCalcEngine = (accInfo, assets) => {
  let shares = []; 
  let fundsToAllocate = accInfo.accSize;
  assets.forEach((el, index) => {
    const { noOfShares } = calculateShares({ ...accInfo, accSize: fundsToAllocate }, el);
    const newShares = noOfShares > 0 ? noOfShares : 0;
    const { entryPriceFee } = calculateFees(accInfo, noOfShares, el)
    fundsToAllocate = Math.max(0, fundsToAllocate - ((noOfShares * el.entryPrice) - entryPriceFee));
    shares.push({ rowId: el.rowId, noOfShares: newShares })
  })

  return shares
}

/*

input: selected, accinfo
output:

[
  {
    rowId: 3r2f3g
    shares: 132
  }
]

*/

// function for getting the amount of shares per trade
export const calculateShares = (accInfo, asset) => {
  const { accRisk, accSize } = accInfo;
  const { entryPrice, stopLossPrice } = asset;
  const lossPerShare = roundToTwo(stopLossPrice - entryPrice);
  const formula = Math.floor(((accRisk * 0.01 * accSize) / -lossPerShare));
  let newShares;
  if (formula * entryPrice > accSize) {
    newShares = Math.floor(accSize / entryPrice)
  } else {
    newShares = formula
  }
  const noOfShares = Number.isFinite(newShares) ? newShares : 0;

  return {
    noOfShares
  }
}

// function to calculate Broker Fees

export const calculateFees = (accInfo, noOfShares, prices) => {
  const { minFee, floatingFee } = accInfo;
  const { entryPrice, targetPrice, stopLossPrice } = prices;
  const floatingFeeDecimal = floatingFee * 0.01;
  const feeThreshold = minFee / floatingFeeDecimal;

  const entryPriceFee = noOfShares === 0 ? 0 : - roundToTwo(noOfShares * entryPrice < feeThreshold ? minFee : entryPrice * noOfShares * floatingFeeDecimal);
  const targetPriceFee = noOfShares === 0 ? 0 : - roundToTwo(noOfShares * targetPrice < feeThreshold ? minFee : targetPrice * noOfShares * floatingFeeDecimal);
  const stopLossPriceFee = noOfShares === 0 ? 0 : - roundToTwo(noOfShares * stopLossPrice < feeThreshold ? minFee : stopLossPrice * noOfShares * floatingFeeDecimal);

  return {
    entryPriceFee,
    targetPriceFee,
    stopLossPriceFee
  }
}