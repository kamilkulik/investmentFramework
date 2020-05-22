import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardContext from '../Dashboard-context';
import Card from '../../Card';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { setDefaultStop, setDefaultTake } from '../../../actions/accInfo';
import { onKeyPress } from '../../../utils/onKeyPress';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '15ch',
    },
  },
}));

const AutoLevels = () => {

  const dispatch = useDispatch();
  const defaults = useSelector(state => state.accInfo);
  const classes = useStyles();
  const { accInfo } = React.useContext(DashboardContext);
  const [values, setValue] = React.useState({
    stopLoss: defaults.defaultStop,
    takeProfit: defaults.defaultTake
  })

  const handleChange = (prop) => (event) => {
    setValue({ ...values, [prop]: event.target.value })
  }

  const handleBlur = (prop) => (event) => {
    if (event.target.value < 0) setValue({ ...values, [prop]: 0 })
    else if (event.target.value > 100 && [prop] === 'stopLoss') setValue({ ...values, [prop]: 100 })
    else { 
      setValue({ ...values, [prop]: event.target.value })
    }
  }

  const keyPress = (e) => {
    onKeyPress(e);
    setDefaultLevels();
  }

  const setDefaultLevels = () => {
    dispatch(setDefaultStop(accInfo, values.stopLoss))
    dispatch(setDefaultTake(values.takeProfit))
  }

  return (
    <Card
      minWidth={250}
      cardTitle={'Default Take Profit & Stop Loss'}
      actionText={'Set Default Levels'}
      buttonAction={setDefaultLevels}
    >
      <FormControl className={classes.root} noValidate autoComplete="off" variant='outlined'>
        <InputLabel htmlFor="stopLoss">Default Stop Loss</InputLabel>
        <OutlinedInput
          id="defaultStopLoss" 
          type='number'
          variant="outlined" 
          value={values.stopLoss}
          onChange={handleChange('stopLoss')}
          onBlur={handleBlur('stopLoss')}
          onKeyDown={keyPress}
          labelWidth={85}
          startAdornment={<InputAdornment position="start">%</InputAdornment>}
          inputProps={{
            min: '0',
            max: '100'
          }}
          />
      </FormControl>
      <FormControl className={classes.root} noValidate autoComplete="off" variant='outlined'>
        <InputLabel htmlFor="takeProfit">Default Take Profit</InputLabel>
        <OutlinedInput
          id="defaultTakeProfit" 
          type='number'
          variant="outlined" 
          value={values.takeProfit}
          onChange={handleChange('takeProfit')}
          onBlur={handleBlur('takeProfit')}
          onKeyDown={keyPress}
          labelWidth={85}
          startAdornment={<InputAdornment position="start">%</InputAdornment>}
          inputProps={{
            min: '0',
            max: '10000'
          }}
          />
      </FormControl>

    </Card>
  )
}

export default AutoLevels;