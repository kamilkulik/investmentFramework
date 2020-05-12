import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import BarChartIcon from '@material-ui/icons/BarChart';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import StockSelector from './pages/StockSelector';
import PositionCalculator from './pages/PositionCalculator';

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

const App = () => {
  const classes = useStyles();

  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
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
        <Switch>
          <Route path='/' exact={true}><App /></Route>
          <Route path='/selector'><StockSelector /></Route>
          <Route path='/calculator'><PositionCalculator /></Route>
      </Switch>
      </main>
    </div>
    </Router>
  );
}

export default App;