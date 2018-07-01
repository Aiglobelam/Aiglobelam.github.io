var React = require('react');
var PropTypes = require('prop-types');

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',

        }
    }

    handleChange = (event) => {
        var value = event.target.value; // Text typed in inputfield
        this.setState(() => {
            return {
                username: value,
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username);
    }

    render() {
        return (
          <form className='column' onSubmit={this.handleSubmit}>
            <label className='header' htmlFor='username'>{this.props.label}</label>
            <input
              id='username'
              placeholder='github username'
              type='text'
              value={this.state.username}
              autoComplete='off'
              onChange={this.handleChange}
            />
            <button className='button' type='submit' disabled={!this.state.username}>Submit</button>
          </form>
        )
      }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

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
    
    renderPlayerOne = () => {
        return !this.state.playerOneName && 
            <PlayerInput 
                id='playerOne'
                label='Player One'
                onSubmit={this.handleSubmit}
            />;
    }

    renderPlayerTwo = () => {
        return !this.state.playerTwoName && 
            <PlayerInput 
                id='playerTwo'
                label='Player Two'
                onSubmit={this.handleSubmit}
            />;
    }

    render () {
        return (
            <div>
                <div className='row'>
                    { this.renderPlayerOne() }
                    { this.renderPlayerTwo() }
                </div>
            </div>
        )
    }
}

module.exports = Battle;