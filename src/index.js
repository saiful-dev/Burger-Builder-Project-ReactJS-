import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


//The JSX code is passed to Babel (a JavaScript compiler) 
//which will then convert it to plain JavaScript code that all browser can understand. 
const app=(// this is routing enable
    <BrowserRouter> 
        <App />
    
    </BrowserRouter> //BrowserRouter is used for doing client side routing with URL segments
 // BrowserRouter handle dynamic request.
);
ReactDOM.render(app,document.getElementById('root'));
//Render a React element into the DOM in the supplied container and return a reference to the component
//ReactDOM.render() controls the contents of the container node you pass in.

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
