import { createStore, combineReducers, compose } from 'redux';
import phaseReducer from '../reducers/phases';
import rowReducer from '../reducers/rows';
import columnReducer from '../reducers/columns';
import filterReducer from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers(
      {
        phases: phaseReducer,
        rows: rowReducer,
        columns: columnReducer,
        filters: filterReducer,
      }
    ),
    composeEnhancers()
    );
  return store
};