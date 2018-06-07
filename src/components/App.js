var React = require('react');
var Popular = require('./Popular');
// state (not required)
// lifecycle events (not reqquired)
// UI (required)
class App extends React.Component {
    
    //--------//
    //-- UI --//
    //--------//
    render() {
        return (
            <div className='container'>
                <Popular/> 
            </div>
        )
    }
}

module.exports = App;