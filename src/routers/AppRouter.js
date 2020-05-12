import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from '../App';
import StockSelector from '../pages/StockSelector';
import PositionCalculator from '../pages/PositionCalculator';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path='/' exact={true}><App /></Route>
        <Route path='/selector'><StockSelector /></Route>
        <Route path='/calculator'><PositionCalculator /></Route>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
