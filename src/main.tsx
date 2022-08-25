import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

if( typeof window !== "undefined" )
ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
