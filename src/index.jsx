import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const pages = [
  'projects',
  'about',
  'contact',
];

ReactDOM.render((
  <BrowserRouter>
    <App pages={pages}/>
  </BrowserRouter>
), document.getElementById('root'));


// Provided by Create React App. Used for caching so the app can work offline.
// See https://developers.google.com/web/fundamentals/primers/service-workers
registerServiceWorker();
