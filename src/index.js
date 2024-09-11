import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './core/App';
import './index.css';
import configureStore from './state/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import ReactBreakpoints from 'react-breakpoints';
import { breakpoints } from './theme/breakpoints';

export const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <ReactBreakpoints breakpoints={breakpoints}>
        <App />
      </ReactBreakpoints>
    </Router>
  </ReduxProvider>,
  document.getElementById('app')
);
