// https://stackoverflow.com/questions/30571875/whats-the-difference-between-super-and-superprops-in-react-when-using-e
// In this example, you are extending the React.Component class, and per the ES2015 spec, 
// a child class ===> constructor <=== cannot make use of "this" until super() has been called; also, 
// ES2015 class constructors have to call super() if they are subclasses.
class MyComponent extends React.Component {
  constructor() {
    console.log(this); // Reference Error
  }

  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

// By contrast:
class MyComponent extends React.Component {
  constructor() {
    super();
    console.log(this); // this logged to console
  }

  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

// More detail as per this excellent stack overflow answer https://stackoverflow.com/a/31079103
// You may see examples of components created by extending the React.Component class that do not
// call super(), but you'll notice these don't have a constructor, hence why it is not necessary.

class MyOtherComponent extends React.Component {
  render() {
    return <div>Hi {this.props.name}</div>;
  }
}
// One point of confusion I've seen from some developers I've spoken to is that the components that have no
// constructor and therefore do not call super() anywhere, still have this.props available in the render() method.
// Remember that this rule and this need to create a this binding for the constructor only applies to the constructor.

// super() is used to call the parent constructor.
// super(props) would pass props to the parent constructor.
// super(props) would call the React.Component constructor passing in props as the argument.
// If you just extend the React.Component calling super(props) will do nothing with props. Maybe It will be changed in the next versions of React.