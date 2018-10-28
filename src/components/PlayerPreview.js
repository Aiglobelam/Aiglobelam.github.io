import React from 'react';
import PropTypes from 'prop-types';

// Stateless functional component
// possible to do export default on stateless functional component in top
export default function PlayerPreview (props) {

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
            {props.children}
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
}

// module.exports = PlayerPreview;
// export default PlayerPreview;