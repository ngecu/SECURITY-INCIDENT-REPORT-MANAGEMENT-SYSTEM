import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { Provider } from 'react-redux'
import { ProSidebarProvider } from "react-pro-sidebar";
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ProSidebarProvider>
    <App />
    </ProSidebarProvider>
    </Provider>,
)
