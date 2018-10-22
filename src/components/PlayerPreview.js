var React = require('react');
var PropTypes = require('prop-types');

// Stateless functional component
function PlayerPreview (props) {

    const { avatar, username, id } = props;

    return (
        <div>
            <div className='column'>
            <img 
                className='avatar'
                src={avatar}
                alt={'Avatar for' + username}
            />
            <h2 className='username'>@{username}</h2>
            </div> 
            <button className='reset'onClick={() => props.onReset(id)}> reset</button>
        </div>
    )
}
// <button className='reset'onClick={props.onReset.bind(null, props.id)}> reset</button>
//                          onClick={props.onReset.bind(null, props.id)
//                              "null" we do not need to bind the this context...
//                              .bind in this case creates a NEW function
// We can instead do like this 
// <button className='reset'onClick={() => props.onReset(id)}> reset</button>
// That is we use arrow function () => props.onReset(id)

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
}

module.exports = PlayerPreview;