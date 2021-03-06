import 'css/icon.css';
import 'css/index.css';
import 'css/card.css';
import 'babel-polyfill';

import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-store';

import App from './app';
import { originalState } from './service/user-setting';

const store = configureStore(originalState);

const theme = createMuiTheme({
  palette: {
    primary: { main: cyan[400], contrastText: '#fff' },
    secondary: {
      main: red[400],
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app-effai'),
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
