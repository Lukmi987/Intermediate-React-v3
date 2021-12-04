import React from 'react-dom'
import { hydrate } from "react-dom"; /// I am expecting complete mark up please take complete mark up
import { BrowserRouter } from "react-router-dom";
import App from './App';

// other stuff that should only happen in the browser like analytics, Router , BrowsersRouter refers to window

hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
)