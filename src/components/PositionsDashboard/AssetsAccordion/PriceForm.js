import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DashboardContext from "../Dashboard-context";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TradeFundsSlider from "./TradeFundsSlider";
import { setPrice, setTradeData, setFunds } from "../../../actions/selected";
import { roundToTwo } from "../../../utils/roundingFunc";
import { defaultStopLoss } from "../../../internalAPI/tradeData";
import { onKeyPress } from "../../../utils/onKeyPress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "20ch",
    },
  },
}));

const PriceForm = ({ assetInfo, rowId, setPrice, setFunds }) => {
  const riskPerTrade = useSelector((state) => state.accInfo.riskPerTrade);
  const proportionalAllocation = useSelector(
    (state) => state.accInfo.proportionalAllocation
  );

  const { accInfo } = React.useContext(DashboardContext);
  const classes = useStyles();

  const [values, setValues] = useState({
    entryPrice: assetInfo.entryPrice,
    targetPrice: assetInfo.targetPrice,
    stopLossPrice: assetInfo.stopLossPrice,
  });

  React.useEffect(() => {
    setValues({
      ...values,
      stopLossPrice: assetInfo.stopLossPrice,
      targetPrice: assetInfo.targetPrice,
    });
  }, [assetInfo]);

  const defaultStopLossPrice = defaultStopLoss(assetInfo, accInfo);

  const minStopLoss = Math.min(defaultStopLossPrice, values.stopLossPrice);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const setValue = (prop) => () => {
    let price;
    if (prop === "entryPrice") {
      price = values.entryPrice;
    } else if (prop === "targetPrice") {
      price = values.targetPrice;
    } else if (prop === "stopLossPrice") {
      price = roundToTwo(minStopLoss);
      setValues({ ...values, stopLossPrice: price });
    }
    setPrice(prop, rowId, price);
  };

  return (
    <React.Fragment>
      <FormControl fullWidth variant="outlined" className={classes.root}>
        <InputLabel htmlFor={`${rowId}-entry-price`}>Entry Price</InputLabel>
        <OutlinedInput
          id={`${rowId}-entry-price`}
          value={values.entryPrice}
          onChange={handleChange("entryPrice")}
          onBlur={setValue("entryPrice")}
          onKeyDown={onKeyPress}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      <FormControl fullWidth variant="outlined" className={classes.root}>
        <InputLabel htmlFor={`${rowId}-target-price`}>Target Price</InputLabel>
        <OutlinedInput
          id={`${rowId}-target-price`}
          value={values.targetPrice}
          onChange={handleChange("targetPrice")}
          onBlur={setValue("targetPrice")}
          onKeyDown={onKeyPress}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      <FormControl fullWidth variant="outlined" className={classes.root}>
        <InputLabel htmlFor={`${rowId}-stop-loss-price`}>
          Stop-Loss Price
        </InputLabel>
        <OutlinedInput
          id={`${rowId}-stop-loss-price`}
          value={values.stopLossPrice}
          onChange={handleChange("stopLossPrice")}
          onBlur={setValue("stopLossPrice")}
          onKeyDown={onKeyPress}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      {!proportionalAllocation && !riskPerTrade && (
        <TradeFundsSlider setFunds={setFunds} rowId={rowId} />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  const assetInfo = state.selected.find((el) => el.rowId === ownProps.rowId);
  return {
    assetInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setPrice: (prop, rowId, price) => dispatch(setPrice(prop, rowId, price)),
  setTradeDataRedux: (rowId, tradeData) =>
    dispatch(setTradeData(rowId, tradeData)),
  setFunds: (rowId, funds) => dispatch(setFunds(rowId, funds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceForm);
