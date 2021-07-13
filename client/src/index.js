import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './reducers';
import {Provider} from 'react-redux';
import './index.css';
import './metrics/allMetrics';
import './metrics/collectMetrics';

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
  document.getElementById('root')
);
