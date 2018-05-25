var React = require('react');

class Popular extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            selectedLanguage: 'All'
        }

        // Concerning the "<li onClick={ this.updateLanguage }" below...
        // Either bind "this" to the function that should be the onClick handler, here in the constructor
        // this.updateLanguage = this.updateLanguage.bind(this);
        // Or use an "arrow function" in the onClick definition. (arrow funcitons auto bind this)
        // <li onClick={ (event) => this.updateLanguage(event, l) }
        // But that solution will create a "new function" every time render is invoked...
        // A bit expensive if done often...
        // Can cause problems if the arrow function you pass are passed into other React components
        // https://reactarmory.com/answers/when-to-use-arrow-functions
        // A third solution is to use arrow functions on "class fields" in a js class.
        // But to use this we currently have to activate a babel plugin that activates this for us.
        // https://babeljs.io/docs/plugins/transform-class-properties/
        // see configuration in package.json
    }

    // Arrow functions can be used here thanx to prposal  "Class field declaration for JS"
    // https://github.com/tc39/proposal-class-fields
    // By using that we can use arrow functions which in turns let us use
    // the  "this" keyword inside of updateLanguage
    updateLanguage = (event, language) => {
        //updateLanguage (language) {
        console.log('updateLanguage was invoked with param', language, event);
        // https://reactjs.org/docs/react-component.html#setstate
        // one may optionally pass an object as the first argument to setState() instead of a function:
        this.setState((prevState, props) => {
            console.log('setting state');
            return { 
                selectedLanguage: language 
            }
        });
    }

    // But how to pass parameters to our "updateLanguage" using onClick???
    // https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    // Solution 0)
    // Either <li onClick={ (event) => this.updateLanguage(event, l) }
    // But then a new function will be created each time render() is invoked... doh...
    // Solution 1) 
    // If we create a sub-component, we can pass handler and use props as the arguments, 
    // which will then re-render only when the props change (because the handler reference now never changes):
    // Solution 2) 
    // The easy solution use es5 bind to pass parameters =)
    // this.updateLanguage.bind(nameOfParameter) 
    render() {
        const languages = ['All', 'Java Script', 'Ruby', 'Java', 'CSS', 'Python'];
        console.log('render this', this);
        return (            
            <div>Popular
                <ul className='languages'>
                    { 
                        languages.map(l => {
                            console.log(l);
                            return (
                                <li onClick={ (event) => this.updateLanguage(event, l) }
                                    key={l}>
                                    {l}
                                </li>
                            )
                        }) 
                    }
                </ul>
            </div>
        )
    }
}

module.exports = Popular;