import * as React from 'react';
import * as ReactDOM from "react-dom";
import App from './App';
import {store} from './store/reducers';
import {Provider} from 'react-redux';
import './index.css';

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
document.getElementById('root')
);
