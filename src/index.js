import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './styles/main.scss';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { saveState } from './store/localStorage';

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

store.subscribe(() => {
  saveState({
    phases: store.getState().phases,
    rows: store.getState().rows,
    columns: store.getState().columns,
    filters: store.getState().filters,
    selected: store.getState().selected,
    values: store.getState().values,
    accInfo: store.getState().accInfo
  })
})