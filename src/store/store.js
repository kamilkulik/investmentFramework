import { createStore, combineReducers, compose } from 'redux';
import phaseReducer from '../reducers/phases';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers(
      {
        phases: phaseReducer
      }
    ),
    composeEnhancers()
    );
  return store
};