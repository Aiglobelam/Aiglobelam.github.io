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
        // We must capture the event into a variable, else the event in React will be gone
        const value = event.target.value; // Text typed in inputfield
        this.setState(() => ({username: value}));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username);
    }

    render() {

        const { username } = this.state;
        const { label } = this.props;

        return (
          <form className='column' onSubmit={this.handleSubmit}>
            <label className='header' htmlFor='username'>{label}</label>
            <input
              id='username'
              placeholder='github username'
              type='text'
              value={username}
              autoComplete='off'
              onChange={this.handleChange}
            />
            <button className='button' type='submit' disabled={!username}>Submit</button>
          </form>
        )
      }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

module.exports = PlayerInput;