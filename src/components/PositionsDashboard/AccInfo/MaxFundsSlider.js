import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider({ setFundsPerTrade }) {

  const startValue = useSelector(state => state.accInfo.fundsPerTrade);
  const classes = useStyles();
  const [value, setValue] = React.useState(startValue);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnMouseUp = () => {
    setFundsPerTrade(value);
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue === '' ? '' : Number(inputValue));
    setFundsPerTrade(inputValue);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const determineInputProps = () => {
    if (value === 0) {
      return {
        type: 'text',
        'aria-labelledby': 'input-slider',
      }
    } else {
      return {
        step: 5,
        min: 0,
        max: 100,
        type: 'number',
        'aria-labelledby': 'input-slider',
      }
    }
  }

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Max Funds Per Trade
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          %
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            onChangeCommitted={handleOnMouseUp}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value === 0 ? 'AUTO' : value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={determineInputProps()}
          />
        </Grid>
      </Grid>
    </div>
  );
}