var React = require('react');

class Popular extends React.Component {

    constructor (props) {
        // TODO: Why Super props? see learnings/constructorSuperProps.js
        super(props);
        this.state = {
            selectedLanguage: 'All'
        }

        // Concerning the "<li onClick={ this.updateLanguage }" below...
        // Either bind "this" to the function that should be the onClick handler, 
        // * here in the constructor
        // LIKE => this.updateLanguage = this.updateLanguage.bind(this);
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

    // Arrow functions can be used here, when defining a function, thanx to prposal "Class field declaration for JS"
    // https://github.com/tc39/proposal-class-fields
    // By using that propsal, we can use arrow functions which in turns let us use
    // the "this" keyword inside of updateLanguage
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
    // NOTE: Bind creates a new function, it does not invoke the function.
    // this.updateLanguage.bind(null, nameOfParameter) 
    // this.updateLanguage.bind(null, language)
    // null => If we have already bound "this" to the function
    //      => Either in the constructor or by using bind or by using an arrow function
    render() {
        const languages = ['All', 'Java Script', 'Ruby', 'Java', 'CSS', 'Python'];
        console.log('Popular render()');
        return (            
            <div>Popular
                <ul className='languages'>
                    { 
                        languages.map(l => {
                            return (
                                <li 
                                    style={ this.selectedLanguageStyle(l) }
                                    onClick={ (event) => this.updateLanguage(event, l) }
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

    selectedLanguageStyle = (language) => {
        return language === this.state.selectedLanguage ? { color: '#d0021b' } : null
    }
}

module.exports = Popular;