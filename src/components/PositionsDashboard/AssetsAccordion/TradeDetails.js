import React from 'react';
import { calcTradeData } from '../../../internalAPI/tradeData';
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
    returnRiskRatio: 0
  });

  const { 
    lossPerShare,
    profitPerShare,
    noOfShares,
    maxLoss,
    estimatedTradeProfit,
    positionValue,
    returnRiskRatio
   } = tradeData;

  React.useEffect(() => {
    setTradeData(calcTradeData(rowId, accInfo, selected));
  }, [rowId, accInfo, selected]);
  
  return (
    <React.Fragment>
      <p>Number of shares: {noOfShares}</p>
      <p>Position Value: {positionValue}</p>
      <p>Return / Risk ratio: {returnRiskRatio}</p>
      <p>Estimated trade profit: ${estimatedTradeProfit}</p>
      <p>Max loss: ${maxLoss}</p>
      <p>Profit per Share: ${profitPerShare}</p>
      <p>Loss per Share: ${lossPerShare}</p>
    </React.Fragment>
  )
}

export default TradeDetails;