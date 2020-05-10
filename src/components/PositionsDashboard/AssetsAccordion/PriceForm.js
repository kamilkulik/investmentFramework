import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DashboardContext from '../Dashboard-context';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TradeFundsSlider from './TradeFundsSlider';
import { setPrice, setTradeData, setFunds } from '../../../actions/selected';
import { roundToTwo } from '../../../utils/roundingFunc';
import { defaultStopLoss } from '../../../internalAPI/tradeData';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
}));

const PriceForm = ({ rowId, setPrice, setFunds }) => {

  const proportionalAllocation = useSelector(state => state.accInfo.proportionalAllocation);

  const { accInfo, selected } = React.useContext(DashboardContext);
  const assetInfo = selected.find(el => el.rowId === rowId);
  const classes = useStyles();
  
  const [values, setValues] = useState({
    entryPrice: assetInfo.entryPrice,
    targetPrice: assetInfo.targetPrice,
    stopLossPrice: assetInfo.stopLossPrice,
  })
  const defaultStopLossPrice = defaultStopLoss(assetInfo, accInfo);
  const minStopLoss = values.stopLossPrice > defaultStopLossPrice ? defaultStopLossPrice : values.stopLossPrice;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const setValue = (prop) => () => {
    let price;
      if (prop === 'entryPrice') {
        price = values.entryPrice
      } else if (prop === 'targetPrice') {
        price = values.targetPrice
      } else if (prop === 'stopLossPrice') {
        price = roundToTwo(minStopLoss)
        setValues({ ...values, stopLossPrice: price})
      }
    setPrice(prop, rowId, price)

  }

  return (
    <React.Fragment>
      <FormControl fullWidth variant="outlined" className={classes.root}>
        <InputLabel htmlFor={`${rowId}-entry-price`}>Entry Price</InputLabel>
        <OutlinedInput
          id={`${rowId}-entry-price`}
          value={values.entryPrice}
          onChange={handleChange('entryPrice')}
          onBlur={setValue('entryPrice')}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      <FormControl fullWidth variant="outlined" className={classes.root}>
      <InputLabel htmlFor={`${rowId}-target-price`}>Target Price</InputLabel>
      <OutlinedInput
        id={`${rowId}-target-price`}
        value={values.targetPrice}
        onChange={handleChange('targetPrice')}
        onBlur={setValue('targetPrice')}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        labelWidth={60}
      />
      </FormControl>
      <FormControl fullWidth variant="outlined" className={classes.root}>
      <InputLabel htmlFor={`${rowId}-stop-loss-price`}>Stop-Loss Price</InputLabel>
      <OutlinedInput
        id={`${rowId}-stop-loss-price`}
        value={minStopLoss}
        onChange={handleChange('stopLossPrice')}
        onBlur={setValue('stopLossPrice')}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        labelWidth={60}
      />
      </FormControl>
      {!proportionalAllocation && <TradeFundsSlider 
        setFunds={setFunds}
        rowId={rowId}
      />}
    </React.Fragment>
  )  
}

const mapDispatchToProps = (dispatch) => ({
  setPrice: (prop, rowId, price) => dispatch(setPrice(prop, rowId, price)),
  setTradeDataRedux: (rowId, tradeData) => dispatch(setTradeData(rowId, tradeData)),
  setFunds: (rowId, funds) => dispatch(setFunds(rowId, funds))
});

export default connect(null, mapDispatchToProps)(PriceForm);