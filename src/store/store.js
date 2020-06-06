import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import phaseReducer from "../reducers/phases";
import rowReducer from "../reducers/rows";
import columnReducer from "../reducers/columns";
import filterReducer from "../reducers/filters";
import selectedReducer from "../reducers/selected";
import valuesReducer from "../reducers/values";
import accInfoReducer from "../reducers/accInfo";
import { loadState } from "./localStorage";

const reducer = combineReducers({
  phases: phaseReducer,
  rows: rowReducer,
  columns: columnReducer,
  filters: filterReducer,
  selected: selectedReducer,
  values: valuesReducer,
  accInfo: accInfoReducer,
});
const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    reducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
