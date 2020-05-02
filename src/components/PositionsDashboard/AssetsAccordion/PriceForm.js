import React, { useState } from 'react';
import { connect } from 'react-redux';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { setTradeData } from '../../../actions/selected';
import { setEntryPrice, setTargetPrice, setStopLoss } from '../../../actions/selected';

const PriceForm = ({ rowId, selected, accInfo, setEntryPrice, setTargetPrice, setStopLoss, setTradeDataRedux }) => {

  const assetInfo = selected.find(el => el.rowId === rowId)

  const [values, setValues] = useState({
    entryPrice: assetInfo.entryPrice,
    targetPrice: assetInfo.targetPrice,
    stopLossPrice: assetInfo.stopLossPrice
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const setValue = (prop) => () => {
    if (prop === 'entryPrice') {
      setEntryPrice(rowId, values.entryPrice)
    } else if (prop === 'targetPrice') {
      setTargetPrice(rowId, values.targetPrice)
    } else if (prop === 'stopLossPrice') {
      setStopLoss(rowId, values.stopLossPrice)
    }
  }

  return (
    <React.Fragment>
      <FormControl fullWidth variant="outlined">
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
      <FormControl fullWidth variant="outlined">
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
      <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={`${rowId}-stop-loss-price`}>Stop-Loss Price</InputLabel>
      <OutlinedInput
        id={`${rowId}-stop-loss-price`}
        value={values.stopLossPrice}
        onChange={handleChange('stopLossPrice')}
        onBlur={setValue('stopLossPrice')}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        labelWidth={60}
      />
      </FormControl>
    </React.Fragment>
  )  
}

const mapStateToProps = (state) => ({
  selected: state.selected, 
  accInfo: state.accInfo
})

const mapDispatchToProps = (dispatch) => ({
  setEntryPrice: (rowId, entryPrice) => dispatch(setEntryPrice(rowId, entryPrice)),
  setTargetPrice: (rowId, targetPrice) => dispatch(setTargetPrice(rowId, targetPrice)),
  setStopLoss: (rowId, stopLossPrice) => dispatch(setStopLoss(rowId, stopLossPrice)),
  setTradeDataRedux: (rowId, tradeData) => dispatch(setTradeData(rowId, tradeData))
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceForm);