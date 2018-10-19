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

module.exports = PlayerInput;