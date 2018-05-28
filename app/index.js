var ReactDOM = require('react-dom');
var React = require('react'); // Why is this needed here?

var App = require('./components/App');
// We have configured in Webpack to include all
// "required" css into our bundle/component
// webpack.config.js => modules.rules test css
require('./index.css');

ReactDOM.render(
    <App />,
    document.getElementById('appXXX')
)