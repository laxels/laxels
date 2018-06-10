import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const pages = [
  'projects',
  'about',
  'contact'
];

ReactDOM.render((
  <BrowserRouter>
    <App pages={pages}/>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
