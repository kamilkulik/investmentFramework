import {
  calculateShares,
  shareCalcEngine,
  defaultStopLoss,
  summaryData,
  calculateFees,
} from "../../internalAPI/tradeData";
import { asset, assets, emptyAssets } from "../fixtures/assets";
import { roundToTwo } from "../../utils/roundingFunc";
import accInfo from "../fixtures/accInfo";

const NaNnewAsset = {
  ...asset,
  entryPrice: NaN,
  targetPrice: NaN,
  stopLossPrice: NaN,
};
const NaNnewAccInfo = { ...accInfo, accSize: NaN, accRisk: NaN };

describe("noOfShares", () => {
  test("should return zero for Prices = 0", () => {
    const newAsset = {
      ...asset,
      entryPrice: 0,
      targetPrice: 0,
      stopLossPrice: 0,
    };
    const result = calculateShares(accInfo, newAsset);
    expect(result.noOfShares).toEqual(0);
  });

  test("should return zero for accInfos = 0", () => {
    const newAccInfo = { ...accInfo, accSize: 0, accRisk: 0 };
    const result = calculateShares(newAccInfo, asset);
    expect(result.noOfShares).toEqual(0);
  });

  test("should return zero for NaN inputes", () => {
    const result = calculateShares(NaNnewAsset, NaNnewAccInfo);
    expect(result.noOfShares).toEqual(0);
  });

  test("should calculate correctly noOfShares", () => {
    const result = calculateShares(accInfo, asset);
    expect(result.noOfShares).toEqual(333);
  });
});

describe("shareCalcEngine", () => {
  const result = shareCalcEngine(accInfo, assets);

  const totalPositionValue = (localAccInfo, localAssets) => {
    let stopLosses = [];
    localAssets.forEach((el) => {
      stopLosses.push({
        rowId: el.rowId,
        stopLossPrice: defaultStopLoss(el, localAccInfo),
      });
    });
    const newLocalAssets = localAssets.map((el) => {
      return {
        ...el,
        stopLossPrice: stopLosses.find((sl) => sl.rowId === el.rowId)
          .stopLossPrice,
      };
    });
    const shares = shareCalcEngine(localAccInfo, newLocalAssets);
    const totalValue = localAssets.reduce((acc, cur) => {
      const noOfShares = shares.find((el) => el.rowId === cur.rowId).noOfShares;
      return acc + noOfShares * cur.entryPrice;
    }, 0);
    return totalValue;
  };

  test("should return array of objects", () => {
    expect(Array.isArray(result)).toBeTruthy;
  });

  for (let i = 0; i <= 100; i += 10) {
    test(`with AccRisk ${i}% should return shares whose value is below ${accInfo.accSize}`, () => {
      const newAccInfo = { ...accInfo, accRisk: i };
      const positionValue = totalPositionValue(newAccInfo, assets);
      expect(positionValue).toBeLessThan(accInfo.accSize);
    });
  }
});

describe("summaryData", () => {
  const { accSize: size } = accInfo;
  test("should return an object of 0's for empty assets & null accInfo", () => {
    const result = summaryData(NaNnewAccInfo, emptyAssets);
    const test =
      typeof result === "object" && result !== "null" && result !== "undefined";
    const objectValues = Object.values(result);
    const objectValuesSet = new Set(objectValues);

    expect(test).toBeTruthy;
    expect(objectValuesSet).toEqual(new Set([0]));
  });

  test("should return an object of non-zero values for normal inputs", () => {
    const result = summaryData(accInfo, assets);
    const objectValues = Object.values(result);
    const objectValuesSet = new Set(objectValues);

    expect(test).toBeTruthy;
    expect(objectValuesSet.size).toEqual(objectValues.length);
  });

  for (let i = 0; i <= 100; i += 10) {
    test(`QUALITY: with AccRisk: ${i}% maxTotalLoss < ${size}`, () => {
      const newAccInfo = { ...accInfo, accRisk: i };
      const result = summaryData(newAccInfo, assets);

      expect(result.maxTotalLoss).toBeLessThanOrEqual(size);
    });
  }

  for (let i = 0; i <= 100; i += 10) {
    test(`QUALITY: with AccRisk: ${i}% fundsToAllocate < ${size}`, () => {
      const newAccInfo = { ...accInfo, accRisk: i };
      const result = summaryData(newAccInfo, assets);

      expect(result.fundsToAllocate).toBeLessThanOrEqual(size);
    });
  }

  for (let i = 0; i <= 100; i += 10) {
    test(`QUALITY: with AccRisk: ${i}% fundsCommited < ${size}`, () => {
      const newAccInfo = { ...accInfo, accRisk: i };
      const result = summaryData(newAccInfo, assets);

      expect(result.fundsCommitted).toBeLessThanOrEqual(size);
    });
  }
});

describe("calculateFees", () => {
  const noOfShares = Math.round(Math.random() * 10 ** 4);

  test("returns object with properties: entryPriceFee, targetPriceFee, stopLossPriceFee", () => {
    const result = calculateFees(accInfo, noOfShares, asset);
    expect(Object.keys(result)).toEqual([
      "entryPriceFee",
      "targetPriceFee",
      "stopLossPriceFee",
    ]);
  });

  test("returns object whose values are equal or greater than zero", () => {
    const result = calculateFees(accInfo, noOfShares, NaNnewAsset);
    expect(Object.values(result).every((cur) => cur >= 0)).toBeTruthy;
  });

  test("in normal case, returns object whose values are different", () => {
    const result = calculateFees(accInfo, noOfShares, asset);
    const values = Object.values(result);
    const valuesSet = new Set(values);
    expect(valuesSet.size).toEqual(values.length);
  });

  test("QUALITY: should return correct entryPrice", () => {
    const { entryPriceFee } = calculateFees(accInfo, noOfShares, asset);
    const correctFee = -roundToTwo(
      accInfo.floatingFee * 0.01 * noOfShares * asset.entryPrice
    );
    expect(entryPriceFee).toEqual(correctFee);
  });
});
