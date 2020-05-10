import React, { useState, useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import DashboardContext from '../Dashboard-context';
import MaxFundsSlider from './MaxFundsSlider';
import LabelSwitch from '../../Switches/SwitchWithLabel';
import { setAccountSize, setAccountRisk, setFundsPerTrade, toggleAllocation } from '../../../actions/accInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
}));

const AccForm = ({ setAccountSize, setAccountRisk, setFundsPerTrade, toggleAllocation }) => {

  const defaultAllocation = useSelector(state => state.accInfo.proportionalAllocation);
  const percentAllocated = useSelector(state => state.selected.reduce((acc, cur) => acc + cur.allocatedFunds, 0))
  const { accInfo } = useContext(DashboardContext);
  const [focus, setFocus] = useState(false);
  const accSize = React.createRef();
  const classes = useStyles();

  const [values, setValues] = useState({
    accSize: accInfo.accSize,
    accRisk: accInfo.accRisk,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const setValue = (prop) => () => {
    if (prop === 'accSize') {
      setAccountSize(values.accSize)
    } else if (prop === 'accRisk') {
      setAccountRisk({ ...accInfo, accSize: values.accSize, accRisk: parseFloat(values.accRisk) })
    }
    setFocus(false)
  }

  return (
    <React.Fragment>
      <FormControl fullWidth variant="outlined" className={classes.root}>
        <InputLabel htmlFor="accSize">Account Size</InputLabel>
        <OutlinedInput
          id="accSize"
          ref={accSize}
          value={focus ? values.accSize : values.accSize.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          onChange={handleChange('accSize')}
          onBlur={setValue('accSize')}
          onClick={() => setFocus(true)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      <FormControl fullWidth variant="outlined" className={classes.root}>
      <InputLabel htmlFor="outlined-adornment-risk">Account Risk</InputLabel>
      <OutlinedInput
        id="outlined-adornment-risk"
        value={values.accRisk}
        onChange={handleChange('accRisk')}
        onBlur={setValue('accRisk')}
        startAdornment={<InputAdornment position="start">%</InputAdornment>}
        labelWidth={60}
      />
      </FormControl>
      <LabelSwitch 
        state={defaultAllocation}
        switchLabel='Proportional'
        topLabel='Allocation of funds to trades:'
        toggleAction={toggleAllocation}
      />
      {!defaultAllocation && <TextField
        className={classes.root}
        disabled
        id="outlined-disabled"
        label="Funds Allocated"
        value={percentAllocated}
        variant="outlined"
      />}
      {defaultAllocation && <MaxFundsSlider 
        setFundsPerTrade={setFundsPerTrade}
      />}
    </React.Fragment>
  )  
}

const mapDispatchToProps = (dispatch) => ({
  setAccountSize: (size) => dispatch(setAccountSize(size)),
  setAccountRisk: (risk) => dispatch(setAccountRisk(risk)),
  setFundsPerTrade: (funds) => dispatch(setFundsPerTrade(funds)),
  toggleAllocation: () => dispatch(toggleAllocation())
});

export default connect(null, mapDispatchToProps)(AccForm);