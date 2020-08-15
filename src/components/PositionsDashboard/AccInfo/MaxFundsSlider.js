import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import { roundToTwo } from "../../../utils/roundingFunc";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider({ setFundsPerTrade }) {
  const startValue = useSelector((state) => state.accInfo.fundsPerTrade);
  const NoOfTrades = useSelector((state) =>
    state.selected.length === 0 ? 1 : state.selected.length
  );
  const maxSliderValue = 100 / NoOfTrades;
  const classes = useStyles();
  const [value, setValue] = React.useState(startValue);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnMouseUp = () => {
    setFundsPerTrade(value);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue === "" ? "" : Number(inputValue));
    setFundsPerTrade(inputValue);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > maxSliderValue) {
      setValue(maxSliderValue);
    }
  };

  const determineInputProps = () => {
    if (value === 0) {
      return {
        type: "text",
        "aria-labelledby": "input-slider",
      };
    } else {
      return {
        step: 5,
        min: 0,
        max: 100 / NoOfTrades,
        type: "number",
        "aria-labelledby": "input-slider",
      };
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Max Funds Per Trade
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>%</Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            onChangeCommitted={handleOnMouseUp}
            aria-labelledby="input-slider"
            max={maxSliderValue}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value === 0 ? "AUTO" : roundToTwo(value)}
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
