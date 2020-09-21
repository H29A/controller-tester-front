import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { loadState } from './utils/persist';
import configureStore from './store';

import App from './Containers/App';
import theme from './theme';

// Create redux store
// Loading persisted state
const initialState = loadState();
const store = configureStore(initialState);

document.body.style.margin = '0';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store} >
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
