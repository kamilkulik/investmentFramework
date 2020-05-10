import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
// import { roundToTwo } from '../../../utils/roundingFunc';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider({ rowId, setFunds }) {

  const allocatedFunds = useSelector(state => state.selected.find(el => el.rowId === rowId).allocatedFunds);
  const classes = useStyles();
  const [value, setValue] = React.useState(allocatedFunds);
  const inputRef = React.createRef();

  React.useEffect(() => {
   setValue(allocatedFunds) 
  }, [allocatedFunds])

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnMouseUp = () => {
    setFunds(rowId, value);
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue === '' ? '' : Number(inputValue));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
      setFunds(rowId, 0);
    } else if (value > 100) {
      setValue(100);
      setFunds(rowId, 100)
    } else {
      setFunds(rowId, value);
    }
  };

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      inputRef.current.blur();
    }
  }

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Funds Per This Trade:
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
            max={100}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              onKeyDown: onKeyPress,
              ref: inputRef,
              step: 5,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}