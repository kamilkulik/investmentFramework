import { calculateShares, shareCalcEngine, defaultStopLoss } from '../../internalAPI/tradeData';
import { asset, assets } from '../fixtures/assets';
import accInfo from '../fixtures/accInfo';

describe('noOfShares', () => {
  test('should return zero for Prices = 0', () => {
    const newAsset = { ...asset, entryPrice: 0, targetPrice: 0, stopLossPrice: 0 }
    const result = calculateShares(accInfo, newAsset);
    expect(result.noOfShares).toEqual(0);
  });
  
  test('should return zero for accInfos = 0', () => {
    const newAccInfo = { ...accInfo, accSize: 0, accRisk: 0}
    const result = calculateShares(newAccInfo, asset);
    expect(result.noOfShares).toEqual(0);
  });
  
  test('should return zero for NaN inputes', () => {
    const newAsset = { ...asset, entryPrice: NaN, targetPrice: NaN, stopLossPrice: NaN }
    const newAccInfo = { ...accInfo, accSize: NaN, accRisk: NaN}
    const result = calculateShares(newAccInfo, newAsset);
    expect(result.noOfShares).toEqual(0);
  });

  test('should calculate correctly noOfShares', () => {
    const result = calculateShares(accInfo, asset);
    expect(result.noOfShares).toEqual(333);
  });
});

describe('shareCalcEngine', () => {

  const result = shareCalcEngine(accInfo, assets);

  const totalPositionValue = (localAccInfo, localAssets) => {
    let stopLosses = [];
    localAssets.forEach(el => {
      stopLosses.push({
        rowId: el.rowId,
        stopLossPrice: defaultStopLoss(el, localAccInfo)
      })
    });
    const newLocalAssets = localAssets.map(el => {
      return {
        ...el,
        stopLossPrice: stopLosses.find(sl => sl.rowId === el.rowId).stopLossPrice
      }
    })
    const shares = shareCalcEngine(localAccInfo, newLocalAssets);
    const totalValue = localAssets.reduce((acc, cur,) => {
      const noOfShares = shares.find(el => el.rowId === cur.rowId).noOfShares;
      return acc + (noOfShares * cur.entryPrice)
    }, 0)
    return totalValue
  }

  test('should return array of objects', () => {
    expect(Array.isArray(result)).toBeTruthy;
  });

  for(let i = 0; i <= 100; i += 10 ) {
  test(`with AccRisk ${i}% should return shares whose value is below ${accInfo.accSize}`, () => {
      const newAccInfo = { ...accInfo, accRisk: i};
      const positionValue = totalPositionValue(newAccInfo, assets);
      expect(positionValue).toBeLessThan(accInfo.accSize);
    })
  }
})