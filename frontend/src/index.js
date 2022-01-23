import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import allReducers from './Reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { clientId, domain } from "./config/config"
import { Auth0Provider } from "@auth0/auth0-react"
const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);