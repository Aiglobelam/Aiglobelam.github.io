var React = require('react');
var Popular = require('./Popular');
var ReactRouterDom = require('react-router-dom');
var Router = ReactRouterDom.BrowserRouter;
var Route = ReactRouterDom.Route;
var Switch = ReactRouterDom.Switch;

var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');

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

                        TODO: try to remove exact path now when I have 2 routes starting with "battle"
                        Then you will currently see that path battle matches when going to "/battle/results"
                        or it actually seems to take over all maybe battle/results is not even used.

                        Seems like first matching route will only render not both as Tyler says?
                    */ }
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route path='/popular' component={Popular} />
                        <Route render={this.defaultRouteRender} />
                    </Switch>
                </div>
            </Router>
            
        )
    }
}

module.exports = App;