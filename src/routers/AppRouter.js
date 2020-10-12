import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { saveStockInfo } from '../actions/assetData'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import MainSidebar from '../components/MainSidebar'
import StockSelector from '../pages/StockSelector'
import PositionCalculator from '../pages/PositionCalculator'
import { useFetchStockInfo } from '../utils/customHooks'

// import io from 'socket.io-client'

export const history = createBrowserHistory()

const AppRouter = ({ saveStockInfo }) => {
  const { stockInfo: fetchedStockInfo, status: fetchStatus } = useFetchStockInfo('name')

  useEffect(() => {
    if (fetchStatus !== 'fetched') return undefined

    saveStockInfo(fetchedStockInfo)
  }, [fetchStatus])

  // React.useEffect(() => {
  //   const socket = io('http://localhost:3000');
  //   socket.on('connect', () => {
  //     console.log('successfully connected on the FE');
  //     console.log(socket);
  //     socket.emit('event', { test: Date.now() });
  //   });
  //   socket.on('BE_event', (payload) => {
  //     console.log(payload.payload);
  //   });
  // }, []);

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path='/' exact={true} render={() => <MainSidebar />}></Route>
          <Route
            path='/selector'
            render={() => (
              <MainSidebar>
                <StockSelector />
              </MainSidebar>
            )}></Route>
          <Route
            path='/calculator'
            render={() => (
              <MainSidebar>
                <PositionCalculator />
              </MainSidebar>
            )}></Route>
        </Switch>
      </div>
    </Router>
  )
}

const mapDispatchToProps = (dispatch) => ({
  saveStockInfo: (stockInfo) => dispatch(saveStockInfo(stockInfo)),
})

export default connect(null, mapDispatchToProps)(AppRouter)
