//------------------
// "PURE" FUNCTIONS
//------------------
// - return same result given same arguments. 
// - execution doesn't depend on the state of the application.
// - don't modify the variables outside of their scope.

//-----------
// FUNCTIONS (PURE)
//-----------
const getProfilePic = username => 'https://photo.fb.com/' + username;
const getProfileLink = username => 'https://www.fb.com/' + username;
const getProfileData = username => {
    return { 
        pic: getProfilePic(username),
        link: getProfileLink(username)
    }
}

//-----------
// COMPONENTS (PURE)
//-----------
class ProfilePic extends React.Component {
    render() {
        return (<img src={'https://photo.fb.com/' + this.props.username} />)
    }
}

class ProfileLink extends React.Component {
    render() {
        return (<a href={'https://www.fb.com/' + this.props.username}>{this.props.username}</a>)
    }
}

class Avatar extends React.Component {
    render() {
        return (
            <div>
                <ProfilePic username={this.props.username} />
                <ProfileLink username={this.props.username} />
            </div>
        )
    }
}

//---------------------------------
// Stateless Functional Components (PURE)
//---------------------------------
const ProfilePic = props => <img src={'https://photo.fb.com/' + props.username} />
const ProfileLink = props => <a href={'https://www.fb.com/' + props.username}>{props.username}</a>
const Avatar = props => {
    return (
        <div>
            <ProfilePic username={props.username} />
            <ProfileLink username={props.username} />
        </div>
    )
}
