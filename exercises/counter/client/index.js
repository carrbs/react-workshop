import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

// Import the App component
import { App, store } from './App.js';

// Render the App to the DOM at the <div id='root'></div> element
render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('root'));
