import React from "react";
import { connect, useSelector } from "react-redux";
// import { makeStyles } from '@material-ui/core/styles';
import MaxFundsSlider from "./MaxFundsSlider";
import LabelSwitch from "../../Switches/SwitchWithLabel";
import {
  setFundsPerTrade,
  toggleAllocation,
  toggleRiskPerTrade,
} from "../../../actions/accInfo";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '20ch',
//     },
//   },
// }));

const AccForm = ({
  setFundsPerTrade,
  toggleAllocation,
  toggleRiskPerTrade,
}) => {
  const defaultAllocation = useSelector(
    (state) => state.accInfo.proportionalAllocation
  );
  const riskPerTrade = useSelector((state) => state.accInfo.riskPerTrade);
  // const classes = useStyles();

  return (
    <React.Fragment>
      <LabelSwitch
        state={riskPerTrade}
        switchLabel="Risk Per Trade (Advanced)"
        topLabel="Risk on Account or Trade level:"
        toggleAction={toggleRiskPerTrade}
      />
      {!riskPerTrade && (
        <React.Fragment>
          <LabelSwitch
            state={defaultAllocation}
            switchLabel="Proportional"
            topLabel="Allocation of funds to trades:"
            toggleAction={toggleAllocation}
          />
          {defaultAllocation && (
            <MaxFundsSlider setFundsPerTrade={setFundsPerTrade} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setFundsPerTrade: (funds) => dispatch(setFundsPerTrade(funds)),
  toggleAllocation: () => dispatch(toggleAllocation()),
  toggleRiskPerTrade: () => dispatch(toggleRiskPerTrade()),
});

export default connect(null, mapDispatchToProps)(AccForm);
