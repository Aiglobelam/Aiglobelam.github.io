import React from 'react';
import queryString from 'query-string';
import { battle } from '../utils/githubApi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview.js';
import Loading from './Loading';

function Profile(props) {
    const {
        info: {
            avatar_url,
            login,
            name,
            location,
            company,
            followers,
            following,
            public_repos,
            blog
        }
    } = props;

    return (
        <PlayerPreview username={login} avatar={avatar_url}>
            <ul className='space-list-items'>
                {name && <li>{name}</li>}
                {location && <li>{location}</li>}
                {company && <li>{company}</li>}
                <li>Followers: {followers}</li>
                <li>Following: {following}</li>
                <li>Public Repos: {public_repos}</li>
                {blog && <li><a href={blog}>{blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropTypes.object.isRequired,
}

function Player(props) {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
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

    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        console.log('componentDidMount Results.js');
        const { location: { search } } = this.props;
        const { playerOneName, playerTwoName } = queryString.parse(search);

        console.log('this.props.location.search:', playerOneName, playerTwoName);

        battle([playerOneName, playerTwoName])
            .then(respPlayers => {

                if (respPlayers == null) {
                    return this.setState(() => ({
                        error: 'hmm error does users exist in github?',
                        loading: false,
                    }));
                }

                this.setState(() => ({
                    error: null,
                    winner: respPlayers[0],
                    loser: respPlayers[1],
                    loading: false
                }));

            })
    }

    render() {

        const { error, winner, loser, loading } = this.state;

        if (loading) {
            return (<Loading text={'Results loading..'} />)
        }

        if (error) {
            return (<div><p>{error}</p><Link to='/battle'>Try Again, something went wrong...</Link></div>);
        }

        return (
            <div>
                <div>Results</div>
                <div className='row'>
                    <Player label='Winner' score={winner.score} profile={winner.profile} />
                    <Player label='Loser' score={loser.score} profile={loser.profile} />
                </div>
            </div>
        )
    }
}

// module.exports = Results;
export default Results;