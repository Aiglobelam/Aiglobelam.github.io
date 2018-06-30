var React = require('react');
var Popular = require('./Popular');
var ReactRouterDom = require('react-router-dom');
var Router = ReactRouterDom.BrowserRouter;
var Route = ReactRouterDom.Route;

var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');

// state (not required)
// lifecycle events (not reqquired)
// UI (required)
class App extends React.Component {
    
    //--------//
    //-- UI --//
    //--------//
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Route exact path='/' component={Home} />
                    <Route path='/battle' component={Battle} />
                    <Route path='/popular' component={Popular} />
                </div>
            </Router>
            
        )
    }
}

module.exports = App;