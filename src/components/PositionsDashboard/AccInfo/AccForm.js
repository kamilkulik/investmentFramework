import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import DashboardContext from '../Dashboard-context';
import { setAccountSize, setAccountRisk } from '../../../actions/accInfo';

const AccForm = ({ setAccountSize, setAccountRisk }) => {

  const { accInfo } = useContext(DashboardContext);
  const [focus, setFocus] = useState(false);
  const accSize = React.createRef();

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
      <FormControl fullWidth variant="outlined">
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
      <FormControl fullWidth variant="outlined">
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
    </React.Fragment>
  )  
}

const mapDispatchToProps = (dispatch) => ({
  setAccountSize: (size) => dispatch(setAccountSize(size)),
  setAccountRisk: (risk) => dispatch(setAccountRisk(risk))
});

export default connect(null, mapDispatchToProps)(AccForm);