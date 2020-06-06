import { roundToTwo } from "../utils/roundingFunc";

// TODO - break everything into separate functions

// function that calculates default stop loss. Returns a number

export const defaultStopLoss = (asset, accInfo) => {
  const { noOfShares = 0 } = calculateShares(accInfo, asset);
  const { entryPriceFee, stopLossPriceFee } = calculateFees(
    accInfo,
    noOfShares,
    asset
  );
  const feesPerShare =
    noOfShares === 0 ? 0 : (entryPriceFee + stopLossPriceFee) / noOfShares;
  return roundToTwo(
    asset.entryPrice * ((100 - accInfo.accRisk) * 0.01) - feesPerShare
  );
};

// function that calculates trade details for a single asset
export const calcTradeData = (rowId, accInfo, selected) => {
  const { entryPrice, targetPrice, stopLossPrice } = selected.find(
    (el) => el.rowId === rowId
  );
  const prices = { entryPrice, targetPrice, stopLossPrice };

  const { noOfShares } = shareCalcEngine(accInfo, selected).find(
    (el) => el.rowId === rowId
  );
  const { entryPriceFee, targetPriceFee, stopLossPriceFee } = calculateFees(
    accInfo,
    noOfShares,
    prices
  );

  const lossPerShare = roundToTwo(stopLossPrice - entryPrice);
  const profitPerShare = roundToTwo(targetPrice - entryPrice);
  const maxLoss =
    noOfShares === 0
      ? 0
      : roundToTwo(
          noOfShares * lossPerShare + entryPriceFee + stopLossPriceFee
        );
  const estimatedTradeProfit =
    noOfShares === 0
      ? 0
      : roundToTwo(
          noOfShares * profitPerShare + (entryPriceFee + targetPriceFee)
        );
  const positionValue = roundToTwo(noOfShares * entryPrice);
  const returnRiskRatio =
    profitPerShare === 0 && lossPerShare === 0
      ? 0
      : -roundToTwo(profitPerShare / lossPerShare);

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
    stopLossPriceFee,
  };
};

// function for the accInfo components. Provides total numbers for the entire account
export const summaryData = (accInfo, selected) => {
  const allTradeInfo = selected.map((asset) => {
    return calcTradeData(asset.rowId, accInfo, selected);
  });

  let estimatedTotalProfit,
    maxTotalLoss,
    accReturnRiskRatio,
    fundsToAllocate,
    fundsCommitted;
  if (allTradeInfo.length > 0 && accInfo.accSize > 0 && accInfo.accRisk >= 0) {
    estimatedTotalProfit = roundToTwo(
      allTradeInfo.reduce((acc, cur) => acc + cur.estimatedTradeProfit, 0)
    );
    maxTotalLoss = roundToTwo(
      allTradeInfo.reduce((acc, cur) => acc + cur.maxLoss, 0)
    );
    accReturnRiskRatio =
      estimatedTotalProfit === 0 && maxTotalLoss === 0
        ? 0
        : -roundToTwo(estimatedTotalProfit / maxTotalLoss);
    const totalAllocatedFunds = allTradeInfo.reduce(
      (acc, cur) => acc + cur.positionValue,
      0
    );
    fundsToAllocate = roundToTwo(accInfo.accSize - totalAllocatedFunds);
    fundsCommitted = roundToTwo(
      allTradeInfo.reduce((acc, cur) => acc + cur.positionValue, 0)
    );
  } else {
    estimatedTotalProfit = 0;
    maxTotalLoss = 0;
    accReturnRiskRatio = 0;
    fundsToAllocate = 0;
    fundsCommitted = 0;
  }

  return {
    estimatedTotalProfit,
    maxTotalLoss,
    accReturnRiskRatio,
    fundsToAllocate,
    fundsCommitted,
  };
};

// function to calculate the funds available

export const calcFundsToAllocate = (accInfo, assets) => {
  const fundsPerTradeAmount =
    accInfo.fundsPerTrade === 0
      ? accInfo.accSize / assets.length
      : accInfo.accSize * accInfo.fundsPerTrade * 0.01;
  return roundToTwo(fundsPerTradeAmount);
};

// function to calculate funds per trade if that option is selected on UI

export const calcFundsPerTrade = (accInfo, assets) => {
  const allocatedFundsPercentages = assets.map((asset) => asset.allocatedFunds);
  const arrayOfFundsPerTrade = allocatedFundsPercentages.map(
    (el) => el * 0.01 * accInfo.accSize
  );
  return arrayOfFundsPerTrade;
};

// function for getting the amount of shares per trade across entire account

export const shareCalcEngine = (accInfo, assets) => {
  let shares = [];
  const fundsToAllocate = calcFundsToAllocate(accInfo, assets);
  const variableFundsPerTrade = calcFundsPerTrade(accInfo, assets);
  assets.forEach((el, index) => {
    const noOfShares = accInfo.riskPerTrade
      ? calculateShares(accInfo, el).noOfShares
      : accInfo.proportionalAllocation
      ? calculateShares({ ...accInfo, accSize: fundsToAllocate }, el).noOfShares
      : calculateShares(
          { ...accInfo, accSize: variableFundsPerTrade[index] },
          el
        ).noOfShares;
    const newShares = noOfShares > 0 ? noOfShares : 0;
    shares.push({ rowId: el.rowId, noOfShares: newShares });
  });

  return shares;
};

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
  const { accRisk, accSize, riskPerTrade, tradeRisk, defaultStop } = accInfo;
  const { entryPrice, stopLossPrice } = asset;

  const newStopLossPrice = !!stopLossPrice
    ? stopLossPrice
    : roundToTwo(entryPrice * defaultStop * 0.01);
  const lossPerShare = roundToTwo(newStopLossPrice - entryPrice);
  const formula = riskPerTrade
    ? Math.floor((tradeRisk * 0.01 * accSize) / -lossPerShare)
    : Math.floor((accRisk * 0.01 * accSize) / -lossPerShare);

  let newShares;
  if (formula * entryPrice > accSize) {
    newShares = Math.floor(accSize / entryPrice);
  } else {
    newShares = formula;
  }
  const noOfSharesNoFees = Number.isFinite(newShares) ? newShares : 0;

  // revise the number of shares based on fees

  const { entryPriceFee, stopLossPriceFee } = calculateFees(
    accInfo,
    noOfSharesNoFees,
    asset
  );

  let sharesAdjustment = 0;
  if (entryPrice > -entryPriceFee) {
    sharesAdjustment =
      accSize - noOfSharesNoFees * entryPrice >= -entryPriceFee ? 0 : 1;
  } else {
    sharesAdjustment = Math.ceil(
      -(entryPriceFee + stopLossPriceFee) / (entryPrice - stopLossPrice)
    );
  }

  const noOfShares = noOfSharesNoFees - sharesAdjustment;

  return {
    noOfShares,
  };
};

// function to calculate Broker Fees

export const calculateFees = (accInfo, noOfShares, prices) => {
  const { entryPrice, targetPrice, stopLossPrice } = prices;

  const entryPriceFee = singleFee(accInfo, noOfShares, entryPrice);
  const targetPriceFee = singleFee(accInfo, noOfShares, targetPrice);
  const stopLossPriceFee = singleFee(accInfo, noOfShares, stopLossPrice);

  return {
    entryPriceFee,
    targetPriceFee,
    stopLossPriceFee,
  };
};

export const singleFee = (accInfo, noOfShares, assetPrice) => {
  const { minFee, floatingFee } = accInfo;
  const floatingFeeDecimal = floatingFee * 0.01;
  const feeThreshold = minFee / floatingFeeDecimal;

  const positionValue = noOfShares * assetPrice;
  const feeDue =
    positionValue < feeThreshold ? minFee : positionValue * floatingFeeDecimal;

  const price = noOfShares === 0 ? 0 : -feeDue;
  return roundToTwo(price);
};
