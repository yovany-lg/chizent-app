import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bulma/css/bulma.css';
// import 'bulma-slider/dist/bulma-slider.min.css';
// import 'bulma-slider/dist/bulma-slider.min';
import './assets/fa/css/fontawesome-all.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
