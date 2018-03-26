var React = require('react');
var Popular = require('./Popular');
// state (not req)
// lifecycle events (not req)
// UI (required)
class App extends React.Component {
    // UI
    render() {
        return (
            <div className='container'>
                Hello World!!! <Popular/> 
            </div>
        )
    }
}

module.exports = App;