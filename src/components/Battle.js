var React = require('react');
var PropTypes = require('prop-types');
var PlayerInput = require('./PlayerInput.js');
var PlayerPreview = require('./PlayerPreview.js');
var Link = require('react-router-dom').Link;

class Battle extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null,
        };
    }

    // Arrow functions binds "this", so we do not need to bind it in the constructor to this function
    handleSubmit = (id, username) => {
        this.setState(() => {
            var newState = { };
            newState[`${id}Name`] = username;
            newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
            return newState; // What is returned from setState function is merged with old state
        });
    }

    handleReset = (id) => {
        this.setState(() => {
            var newState = { };
            newState[`${id}Name`] = '';
            newState[`${id}Image`] = null;
            return newState; // What is returned from setState function is merged with old state
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
        console.log(playerOneName);

        return (
            <div>
                <div className='row'>
                    
                    { !playerOneName && 
                        <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit} /> 
                    }
                    { playerOneImage !== null && 
                        <PlayerPreview avatar={playerOneImage} username={playerOneName} onReset={this.handleReset} id={'playerOne'} /> 
                    }

                    { !playerTwoName && 
                        <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit} /> 
                    }
                    { playerTwoImage !== null && 
                        <PlayerPreview avatar={playerTwoImage} username={playerTwoName} onReset={this.handleReset} id={'playerTwo'} /> 
                    }
                </div>
                { this.renderBattleButton() }
            </div>
        )
    }
}

module.exports = Battle;