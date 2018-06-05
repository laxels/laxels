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

const pageColors = {
  projects: 'green',
  about: 'yellow',
  contact: 'red'
};

ReactDOM.render((
  <BrowserRouter>
    <App pages={pages} pageColors={pageColors}/>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
