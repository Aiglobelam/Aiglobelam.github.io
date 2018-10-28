/********************************************************************************
 * Link & NavLink: renders <a... tag 
 * Link: Absoulut fundamental we need to create an anchor tag <a href="">...</a> 
 * NavLink: Change style based on route, NavLink just wraps and ads some extra props to Link.
 **/
import React from 'react';
// Named imports syntax
import { NavLink, Link } from 'react-router-dom'

// Stateless functional component
export default function Nav () {
    return (
        <ul className='nav'>
            {/* exact: only match on the exact route not as else that "/" will also match ex "/popular" */}
            <li><NavLink exact activeClassName='active' to='/'>Home</NavLink></li>
            <li><NavLink activeClassName='active' to='/battle'>Battle</NavLink></li>
            <li><NavLink activeClassName='active' to='/popular'>Popular</NavLink></li>
        </ul>
    );
}

// const Nav = props => {
//     return (
//         <ul className='nav'>

//         </ul>
//     ); 
// }
// module.exports = Nav;