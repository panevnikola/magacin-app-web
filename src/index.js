import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


import './index.css';
import App from './App';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2196f3',
      light: '#e3f2fd',
      dark: '#1e88e5',
      200: '#90caf9',
      300: '#86c5f9',
      800: '#1565c0'
    },
    secondary: {
      main: '#673ab7',
      light: '#ede7f6',
      dark: '#5e35b1',
      200: '#E8E8E8',
      300: '#9876d5',
      800: '#4527a0'
    },
    grey: {
      main: '#A0A0A0',
      light: '#D3D3D3',
      dark: '#404040',
      200: '#b39ddb',
      800: '#505050'
    },
    orange: {
      main: '#ff9933',
      light: '#ffcc99',
      dark: '#b35900',
      200: '#ffd9b3',
      800: '#e67300'
    },
    background: {
      default: '#f2f2f2',
    },
  },
  typography: {
    subtitle1: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
});

const app = (
  <Router basename='/'>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
