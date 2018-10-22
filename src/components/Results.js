var React = require('react');
var queryString = require('query-string');
var githubApi = require('../utils/githubApi');
var Link = require('react-router-dom').Link;
class Results extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount(){
        const { location: { search } } = this.props;
        const { playerOneName, playerTwoName } = queryString.parse(search);

        console.log('this.props.location.search:', playerOneName,playerTwoName );

        githubApi.battle([playerOneName, playerTwoName])
            .then(respPlayers => {
               
                if (respPlayers == null) { 
                    return this.setState(() => {
                        return {
                            error: 'hmm error does users exist in github?',
                            loading: false,
                        }
                    })
                }

                this.setState(() => {
                    return {
                        error: null,
                        winner: respPlayers[0],
                        loser: respPlayers[1],
                        loading: false   
                    }
                });

            })
    }

    render() {
        
        const { error, winner, loser, loading } = this.state;

        if(loading){
            return (<p>Loading...</p>)
        }

        if(error){
            return (<div><p>{error}</p><Link to='/battle'>Try Again, something went wrong...</Link></div>);
        }
        
        return (
            <div>
                <div>Results</div>
                <div>{JSON.stringify(this.state, null, 2)}</div>
            </div>
        )
    }
}

module.exports = Results;