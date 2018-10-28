import ReactDOM from 'react-dom';
import React from 'react'; // Why is this import needed here?

import App from './components/App';
// We have configured in Webpack to include all
// "required" css into our bundle/component
// webpack.config.js => modules.rules test css
// require('./index.css');
import './index.css';

ReactDOM.render(
    <App />,
    document.getElementById('appXXX')
)