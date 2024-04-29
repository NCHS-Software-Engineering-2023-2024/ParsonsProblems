import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FileProvider } from './fileContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FileProvider>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </FileProvider>
  </React.StrictMode>
);