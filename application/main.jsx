import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import { BrowserRouter, Router, Route, IndexRoute, Switch, Link } from 'react-router-dom';

import App from './app';

const appRootDOM = document.getElementById('root');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), appRootDOM)
