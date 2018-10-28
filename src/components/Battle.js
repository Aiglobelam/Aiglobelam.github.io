import React from 'react';
import PlayerInput from './PlayerInput.js';
import PlayerPreview from './PlayerPreview.js';
import { Link } from 'react-router-dom';

class Battle extends React.Component {

    // not needed due to '@babel/plugin-proposal-class-properties'
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         playerOneName: '',
    //         playerTwoName: '',
    //         playerOneImage: null,
    //         playerTwoImage: null,
    //     };
    // }
    
     // made possible due to '@babel/plugin-proposal-class-properties'
    state = {
        playerOneName: '',
        playerTwoName: '',
        playerOneImage: null,
        playerTwoImage: null,
    }

    // Arrow functions binds "this", so we do not need to bind it in the constructor to this function
    handleSubmit = (id, username) => {
        this.setState(() => {
            // ES6 computed property name
            // What is returned from setState function is merged with old state
            return { 
                [`${id}Name`]: username,
                [`${id}Image`]: `https://github.com/${username}.png?size=200`
            }
        });
    }

    handleReset = (id) => {
        this.setState(() => {
            return { 
                // ES6 computed property name
                // What is returned from setState function is merged with old state
                [`${id}Name`]: '',
                [`${id}Image`]: null
            }
        });
    }

    renderBattleButton = () => {
        const { match } = this.props;
        const { playerOneImage, playerTwoImage, playerOneName, playerTwoName } = this.state;

        return playerOneImage && playerTwoImage  &&
        <Link
            className='button'
            to={{
                pathname: match.url + '/results',
                search: `?playerOneName=` + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
            Battle!!!
        </Link>
    }

    render () {
        const { playerOneImage, playerTwoImage, playerOneName, playerTwoName } = this.state;

        return (
            <div>
                <div className='row'>
                    
                    { !playerOneName && 
                        <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit} /> 
                    }
                    { playerOneImage !== null && 
                        <PlayerPreview avatar={playerOneImage} username={playerOneName} >
                            <button className='reset' onClick={() => this.handleReset('playerOne')}> reset p1</button>
                        </PlayerPreview> 
                    }

                    { !playerTwoName && 
                        <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit} /> 
                    }
                    { playerTwoImage !== null && 
                        <PlayerPreview avatar={playerTwoImage} username={playerTwoName} >
                            <button className='reset' onClick={() => this.handleReset('playerTwo')}> reset p2</button>
                        </PlayerPreview> 
                    }
                </div>
                { this.renderBattleButton() }
            </div>
        )
    }
}

// module.exports = Battle;
export default Battle;