import React from 'react'
// import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Hello from './components/Hello'
import AppContent from './components/AppContent'
import store from './store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'

import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

render(
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <Provider store={store}>
                        <React.StrictMode>
                            <App />
                        </React.StrictMode>
                    </Provider>
                }
            >
                <Route path="hello" element={<Hello />} />
                <Route path="/" element={<AppContent />} />
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
