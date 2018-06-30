var React = require('react');
var Popular = require('./Popular');
var ReactRouterDom = require('react-router-dom');
var Router = ReactRouterDom.BrowserRouter;
var Route = ReactRouterDom.Route;
var Switch = ReactRouterDom.Switch;

var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');

// state (not required)
// lifecycle events (not reqquired)
// UI (required)
class App extends React.Component {
    
    defaultRouteRender = () => <p>Route not found seru...</p>;

    //--------//
    //-- UI --//
    //--------//
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    { /* 
                        Instead of render all of the routes that are active,
                        Switch, is going to render one specific Route even if several matches.
                        So when using Swithc "exact is not needed..." !?!?!?!?
                        <Route render={defaultRouteRender} />
                    */ }
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/popular' component={Popular} />
                        <Route render={this.defaultRouteRender} />
                    </Switch>
                </div>
            </Router>
            
        )
    }
}

module.exports = App;