var React = require('react');
var queryString = require('query-string');
var githubApi = require('../utils/githubApi');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var PlayerPreview = require('./PlayerPreview.js');

        function Profile (props) {
            var info = props.info;
          
            return (
              <PlayerPreview username={info.login} avatar={info.avatar_url}>
                <ul className='space-list-items'>
                  {info.name && <li>{info.name}</li>}
                  {info.location && <li>{info.location}</li>}
                  {info.company && <li>{info.company}</li>}
                  <li>Followers: {info.followers}</li>
                  <li>Following: {info.following}</li>
                  <li>Public Repos: {info.public_repos}</li>
                  {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
                </ul>
              </PlayerPreview>
            )
          }
          
          Profile.propTypes = {
            info: PropTypes.object.isRequired,
          }

function Player (props) {
    return (
      <div>
        <h1 className='header'>{props.label}</h1>
        <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
        <Profile info={props.profile} />
      </div>
    )
  }
  
  Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
  }
  
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
        console.log('componentDidMount Results.js');
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
                <div className='row'>
                    <Player label='Winner' score={winner.score} profile={winner.profile}/>
                    <Player label='Loser' score={loser.score} profile={loser.profile}/>
                </div>
            </div>
        )
    }
}

module.exports = Results;