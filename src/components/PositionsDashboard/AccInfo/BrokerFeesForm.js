import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import {
  setMinBrokerFee,
  setFloatingBrokerFee,
} from '../../../actions/accInfo';
import { roundToTwo } from '../../../utils/roundingFunc';
import { onKeyPress } from '../../../utils/onKeyPress';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
}));

const BrokerFeesForm = ({ setMinBrokerFee, setFloatingBrokerFee }) => {
  const classes = useStyles();
  const accInfo = useSelector((state) => state.accInfo);

  const [values, setValues] = useState({
    minFee: accInfo.minFee,
    floatingFee: accInfo.floatingFee,
  });

  const feeThreshold = () => {
    const threshold =
      roundToTwo(accInfo.minFee / (accInfo.floatingFee * 0.01)) || 0;
    return threshold;
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const setValue = (prop) => () => {
    if (prop === 'minFee') {
      setMinBrokerFee(values.minFee);
    } else if (prop === 'floatingFee') {
      setFloatingBrokerFee(values.floatingFee);
    }
  };

  return (
    <React.Fragment>
      <FormControl fullWidth variant='outlined' className={classes.root}>
        <InputLabel htmlFor='outlined-adornment-minFee'>
          Min Broker Fee
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-minFee'
          value={values.minFee}
          onChange={handleChange('minFee')}
          onBlur={setValue('minFee')}
          onKeyDown={onKeyPress}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      <FormControl fullWidth variant='outlined' className={classes.root}>
        <InputLabel htmlFor='outlined-adornment-floatingFee'>
          Floating Broker Fee
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-floatingFee'
          value={values.floatingFee}
          onChange={handleChange('floatingFee')}
          onBlur={setValue('floatingFee')}
          onKeyDown={onKeyPress}
          startAdornment={<InputAdornment position='start'>%</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      <FormControl fullWidth variant='outlined' className={classes.root}>
        <InputLabel htmlFor='outlined-adornment-feeThreshold'>
          Broker Fee Threshold
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-feeThreshold'
          value={feeThreshold()}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setMinBrokerFee: (minFee) => dispatch(setMinBrokerFee(minFee)),
  setFloatingBrokerFee: (floatingFee) =>
    dispatch(setFloatingBrokerFee(floatingFee)),
});

export default connect(null, mapDispatchToProps)(BrokerFeesForm);
