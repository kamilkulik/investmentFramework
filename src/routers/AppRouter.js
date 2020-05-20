import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MainSidebar from '../components/MainSidebar';
import StockSelector from '../pages/StockSelector';
import PositionCalculator from '../pages/PositionCalculator';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path='/' exact={true} render={() => (
          <MainSidebar />
        )}>
        </Route>
        <Route path='/selector' render={() => (
            <MainSidebar>
              <StockSelector />
            </MainSidebar>
          )}>
        </Route>
        <Route path='/calculator' render={() => (
          <MainSidebar>
            <PositionCalculator />
          </MainSidebar>
        )}>
        </Route>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
