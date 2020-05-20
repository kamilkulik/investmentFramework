import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useLocation } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import BarChartIcon from '@material-ui/icons/BarChart';
import { NavLink } from 'react-router-dom';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const MainSidebar = ({ children }) => {
  const classes = useStyles();
  // const location = useLocation().pathname.slice(1);

  // const toolBarTitle = () => {
  //   switch(location) {
  //     case 'selector':
  //       return 'Asset Selector'
  //     case 'calculator':
  //       return 'Position Sizing Calculator'
  //     default:
  //       return 'Investment Framework'
  //   }
  // }

  return (

    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <NavLink to='/selector' activeClassName='currentLocation'>
            <ListItem button key={'Asset Selector'}>
              <ListItemIcon><FlightTakeoffIcon /></ListItemIcon>
              <ListItemText primary={'Asset Selector'} />
            </ListItem>
          </NavLink>
          <NavLink to='/calculator' activeClassName='currentLocation'>
            <ListItem button key={'Position Calculator'}>
              <ListItemIcon><BarChartIcon /></ListItemIcon>
              <ListItemText primary={'Position Calculator'} />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>

  );
}

export default MainSidebar;