import React from 'react';
import { calcTradeData } from '../../../internalAPI/tradeData';
import { roundToTwo } from '../../../utils/roundingFunc';
import DashboardContext from '../Dashboard-context';

const TradeDetails = ({ rowId }) => {
  const { accInfo, selected } = React.useContext(DashboardContext);
  const [tradeData, setTradeData] = React.useState({
    lossPerShare: 0,
    profitPerShare: 0,
    noOfShares: 0,
    maxLoss: 0,
    estimatedTradeProfit: 0,
    positionValue: 0,
    returnRiskRatio: 0,
    entryPriceFee: 0,
    targetPriceFee: 0,
    stopLossPriceFee: 0
  });

  const { 
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
   } = tradeData;

  React.useEffect(() => {
    setTradeData(calcTradeData(rowId, accInfo, selected));
  }, [rowId, accInfo, selected]);

  return (
    <React.Fragment>
      <p>Number of shares: {noOfShares.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      <p>Position Value: ${positionValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      <p>Return / Risk ratio: {returnRiskRatio}</p>
      <p>Estimated trade profit: ${estimatedTradeProfit.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      <p>Max loss: ${maxLoss.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      <p>Profit per Share: ${profitPerShare.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      <p>Loss per Share: ${lossPerShare.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      <p>Entry Price Fee: ${entryPriceFee.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      <p>Target price Fee: ${targetPriceFee.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      <p>Stop Loss Fee: ${stopLossPriceFee.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      <p>Take profit deal fee: ${roundToTwo(targetPriceFee + entryPriceFee).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      <p>Stop Loss deal Fee: ${roundToTwo(stopLossPriceFee + entryPriceFee).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
      
    </React.Fragment>
  )
}

export default TradeDetails;