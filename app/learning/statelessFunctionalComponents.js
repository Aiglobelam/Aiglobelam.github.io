/* Stateless functional components */
// Components that take in some data via props and outputs some UI "Just a render method"
// Container components => Logic...
// Presentational components => Just Render
// In React components can also be "just" a normal function (if that component just have render method and optional props)

// React component that just have render => Which means we can simplify
class HelloWorld extends React.Component {
    render () {
      return (
        <div>Hello {this.props.name}</div>
      )
    }
  }
  ReactDOM.render(<HelloWorld name='Tyler' />, document.getElementById('app'))

  // Simplify to this, just a plain function, A stateless functional component (no state)
  function HelloWorld (props) {
    return (
      <div>Hello {props.name}</div>
    )
  }
  ReactDOM.render(<HelloWorld name='Tyler' />, document.getElementById('app'))

//---------------------------------
// Stateless Functional Components (PURE)
//---------------------------------
const ProfilePic = props => <img src={'https://photo.fb.com/' + props.username} />
const ProfileLink = props => <a href={'https://www.fb.com/' + props.username}>{props.username}</a>
const Avatar = props => {
    return (
        <div>{rops.username}</div>
    )
}