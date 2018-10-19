//-------------------------------------------------------------------------------------------------
// Read more: https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d
//
//
//-------------------------------------------------------------------------------------------------

// Life Cycle Methods. 2 categories
// 1) Component gets mounted a/ unmounted in DOM.
// 2) Component receives new data.

//- - - - - - - - - - - - - -
// Life cycle method: MOUNT
//- - - - - - - - - - - - - -

    componentWillMount() {
        // * componentWillMount — please use componentDidMount instead, 
        // A thing to notice is that componentWillMount is invoked both on serverside and clientside
    }

    componentDidMount() {
        // Invoked once the component is mounted to the DOM
        // It is only invoked on client side, not server side.
        // Good for making AJAX requests
    }

//- - - - - - - - - - - - - - -
// Life cycle method: UNMOUNT
//- - - - - - - - - - - - - - -

    componentWillUnmount() {
        // Called IMMEDIATELY before a component is unmounted
        // Good for cleaning up listeners
    }

//- - - - - - - - - 
// RECEIVES NEW DATA
//- - - - - - - - - 

    componentWillReceiveProps(nextProps) {
        // ========> componentWillReceiveProps REPLACED BY getDerivedStateFromProps
        // https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
        // If you need to perform a side effect (for example, data fetching or an animation) in response to a change in props, use componentDidUpdate lifecycle instead.
        // For other use cases, follow the recommendations in this blog post about derived state.
        // If you used componentWillReceiveProps for re-computing some data only when a prop changes, use a memoization helper instead.
        // If you used componentWillReceiveProps to “reset” some state when a prop changes, consider either making a component fully controlled or fully uncontrolled with a key instead.
        // In very rare cases, you might want to use the getDerivedStateFromProps lifecycle as a last resort.
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // This STATIC method gets called whenever the component in question receives new data from its parent.
        // Use this method when you need to update the state of the component based on passed in props.
        // This is the lifecycle method in which you’d do that. It’ll be passed the props and the state, 
        // and the object you return will be merged with the current state.

        // STATIC wtf?
        // A method / func that exists on class it self not its instance.
        // Static method / func does not have access to "this" and has the keyword "static" as prefix.

        // getDerivedStateFromProps
        // * Replaces previous life cycle method "componentWillReceiveProps"
        // * Invoked on initial mounting 
        // * Invoked on re-rendering
        // * Can be used instead of creating state based on props in constructor
        // * OBS: We still need to declare initial state of the component (either in constructor or as a class field).
        return {
            // The object you return from this function will
            // be merged with the current state.
            // ...
        }
    };

    componentWillUpdate() {
        // ========> componentWillUpdate — please use componentDidUpdate instead
        // Note that you cannot call this.setState() here; nor should you do anything else (e.g. dispatch a Redux action) 
        // that would trigger an update to a React component before componentWillUpdate returns
    }

    componentDidUpdate() {
        // qhttps://reactjs.org/docs/react-component.html#componentdidupdate
        // - Not invoked on the initial render
        // - Will not be invoked if shouldComponentUpdate(nextProps, nextState) returns false.
    }


