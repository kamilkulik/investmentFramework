import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import {
  setAccountSize,
  setAccountRisk,
  setTradeRisk,
} from '../../../actions/accInfo';
import { onKeyPress } from '../../../utils/onKeyPress';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
}));

const AccForm = () => {
  const {
    accInfo,
    accInfo: { proportionalAllocation: defaultAllocation },
    accInfo: { riskPerTrade },
  } = useSelector((state) => state);

  const percentAllocated = useSelector((state) =>
    state.selected.reduce((acc, cur) => acc + cur.allocatedFunds, 0)
  );
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);
  const accSize = React.createRef();
  const classes = useStyles();

  const [values, setValues] = useState({
    accSize: accInfo.accSize,
    accRisk: accInfo.accRisk,
    tradeRisk: accInfo.tradeRisk,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const setValue = (prop, actionCreator) => () => {
    const action = {
      ...accInfo,
      [prop]: values[prop],
    };

    dispatch(actionCreator(action));
    setFocus(false);
  };

  const toggleFocus = (value) => () => {
    setFocus(value);
  };

  return (
    <React.Fragment>
      <FormControl fullWidth variant='outlined' className={classes.root}>
        <InputLabel htmlFor='accSize'>Account Size</InputLabel>
        <OutlinedInput
          id='accSize'
          ref={accSize}
          value={
            focus
              ? values.accSize
              : values.accSize
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }
          onChange={handleChange('accSize')}
          onBlur={setValue('accSize', setAccountSize)}
          onKeyDown={onKeyPress}
          onClick={toggleFocus(true)}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      <FormControl fullWidth variant='outlined' className={classes.root}>
        <InputLabel htmlFor='outlined-adornment-risk'>
          {riskPerTrade ? 'Trade Risk' : 'Account Risk'}
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-risk'
          value={riskPerTrade ? values.tradeRisk : values.accRisk}
          onChange={handleChange(riskPerTrade ? 'tradeRisk' : 'accRisk')}
          onBlur={
            riskPerTrade
              ? setValue('tradeRisk', setTradeRisk)
              : setValue('accRisk', setAccountRisk)
          }
          onKeyDown={onKeyPress}
          startAdornment={<InputAdornment position='start'>%</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      {!riskPerTrade && (
        <React.Fragment>
          {!defaultAllocation && (
            <TextField
              className={classes.root}
              disabled
              id='outlined-disabled'
              label='Funds Allocated'
              value={percentAllocated}
              variant='outlined'
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AccForm;
