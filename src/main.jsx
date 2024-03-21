import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router/router'
import { BrowserRouter } from 'react-router-dom';
import './style.css'

ReactDOM.createRoot(document.getElementById("root")).render(
      <BrowserRouter >
          <AppRouter />
      </BrowserRouter>
);
