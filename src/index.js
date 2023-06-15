import React from 'react';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { ItemsProvider } from './context/ItemsContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <HashRouter basename="/">
    <ItemsProvider>
      <App />
    </ItemsProvider>
  </HashRouter>
);
