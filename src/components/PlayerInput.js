var React = require('react');
var PropTypes = require('prop-types');

class PlayerInput extends React.Component {

    // made possible due to '@babel/plugin-proposal-class-properties'
    // instead of doing it in the bottom PlayerInput.proptypes
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    }

    static defaultProps = {
        label: 'Username',
    }

    // NOT NEEDED we can set the state as a property on the class it self
    // seee '@babel/plugin-proposal-class-properties'
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     username: '',
    //     // }
    // }

    // made possible due to '@babel/plugin-proposal-class-properties'
    state = {
        username: '',
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

// Can be moved inside class due to '@babel/plugin-proposal-class-properties'
// PlayerInput.propTypes = {
//     id: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     onSubmit: PropTypes.func.isRequired,
// }

// module.exports = PlayerInput;
export default PlayerInput;