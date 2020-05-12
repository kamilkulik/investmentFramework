import React from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiDrawer: {
      // Name of the rule
      paperAnchorRight: {
        left: 'auto',
        right: 0,
      },
    },
  },
});

const SettingsDrawer = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer('right', true)}>Settings</Button>
      <ThemeProvider theme={theme}>
        <Drawer 
          anchor={'right'} 
          open={state['right']} 
          onClose={toggleDrawer('right', false)}
          elevation={0}
        >
          Hello!
        </Drawer>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default SettingsDrawer;