import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useIgnoreMountEffect } from "../../utils/customHooks";

const SwitchLabels = ({ state, switchLabel, topLabel, toggleAction }) => {
  const [checked, setChecked] = React.useState(state);

  useIgnoreMountEffect(() => {
    toggleAction();
  }, checked);

  return (
    <FormControlLabel
      label={topLabel}
      labelPlacement="top"
      control={
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={() => setChecked(!checked)}
              color="primary"
            />
          }
          label={switchLabel}
        />
      }
    />
  );
};

export default SwitchLabels;
