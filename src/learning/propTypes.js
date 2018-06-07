var React = require('react');
var PropTypes = require('prop-types');

//-----------------------------------------------------------
// PropTypes
// https://reactjs.org/docs/typechecking-with-proptypes.html

class Users extends React.Component {
  render() {
    return (
      <ul>
        { this.props.list.map(friend => <li>{friend}</li>) }
      </ul>
    )
  }
}

Users.propTypes = {
  list: PropTypes.array.isRequired
}