var React = require('react');
var ReactDOM = require('react-dom');

// We have configured in Webpack to include all required css into our bundle...
require('./index.css');

// state (not req)
// lifecycle events (not req)
// UI (required)
class App extends React.Component {
    // UI
    render() {
        return (
            <div>
                Hello World!!!
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('appXXX')
)