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

// * componentWillMount — please use componentDidMount instead
componentDidMount(){
    // Invoked once the component is mounted to the DOM
    // Good for making AJAX requests
  }

//- - - - - - - - - - - - - - -
// Life cycle method: UNMOUNT
//- - - - - - - - - - - - - - -

componentWillUnmount(){
    // Called IMMEDIATELY before a component is unmounted
    // Good for cleaning up listeners
  }

//- - - - - - - - - 
// RECEIVES NEW DATA
//- - - - - - - - - 

// ========>
// ========> getDerivedStateFromProps
// ========>

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

static getDerivedStateFromProps(nextProps, prevState) {
    return {
        // The object you return from this function will
        // be merged with the current state.
        // ...
    }
};


// ========>
// ========> componentWillUpdate — please use componentDidUpdate instead
// ========>

// ========>
// ========> componentDidUpdate
// ========>