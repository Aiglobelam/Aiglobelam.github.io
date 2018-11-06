//-----------------
// LIBRARY CODE
//-----------------
function createStore (reducer) {

    //----------
    // The state
    let state;

    //----------
    // Get state
    const getState = () => state;

    //------------------------
    // Listen to state changes
    let listeners = [];
    const unsubscribe = listenerPassedIn => {
        return () => {
            listeners = listeners.filter((l) => l !== listenerPassedIn);
        }
    }

    const subscribe = listener => {
        listeners.push(listener);
        // When user subscribes give it back the possibillity to unsubscribe
        return unsubscribe(listener);
    }

    // responsible for updating the state / change the state
    const dispatch = action => {
        // call our todos function
        console.log('dispatch calling todos');
        state = reducer(state, action);
        // inform listeners that state has changed
        console.log('dispatch calling each listener', listeners);
        listeners.forEach(l => l()); // That is invoke each listener function
    }

    // API
    return {
        getState,
        subscribe,
        dispatch,
    }
}

//-----------------
// APPLICATION CODE below...
//-----------------
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

//----------------
// ACTION CREATORS
//----------------
const addTodoActionCreator = todo => {
    return {
        type: ADD_TODO,
        todo,
    }
};

const removeTodoActionCreator = id => {
    return {
        type: REMOVE_TODO,
        id,
    }
}

const toggleTodoActionCreator = id => {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

const addGoalActionCreator = goal => {
    return {
        type: ADD_GOAL,
        goal,
    }
}

const removeGoalActionCreator = id => {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

//-------------
// Update state
//------------------
// "PURE" FUNCTIONS
//------------------
// - return same result given same arguments. 
// - execution doesn't depend on the state of the application.
// - don't modify the variables outside of their scope.

// Update current state based on action, 
// The "reducer function" sets default state?
function todosReducer(currentState = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return currentState.concat([action.todo])
        case REMOVE_TODO:
            return currentState.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return currentState.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete })
            )
        default:
            return currentState
    }
};

function goalsReducer(currentState = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return currentState.concat([action.goal])
        case REMOVE_GOAL:
            return currentState.filter((goal) => goal.id !== action.id)
        default:
            return currentState
    }
};

// Reducer composition... Pass in what is returned from this function as a "reducer" to the store
function combinedReducers(state = {}, action) {
    // Observe that each reducer gets passed its own part of the state!!!
    return {
        todos: todosReducer(state.todos, action),
        goals: goalsReducer(state.goals, action),
    }
}

//----------------
// IMPLEMENTATION
//----------------
// usage of store and actions ans reducers

const store = createStore(combinedReducers)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch(addTodoActionCreator({
    id: 0,
    name: 'Walk the dog',
    complete: false,
}))

store.dispatch(addTodoActionCreator({
    id: 1,
    name: 'Wash the car',
    complete: false,
}))

store.dispatch(addTodoActionCreator({
    id: 2,
    name: 'Go to the gym',
    complete: true,
}))

store.dispatch(removeTodoActionCreator(1))

store.dispatch(toggleTodoActionCreator(0))

store.dispatch(addGoalActionCreator({
    id: 0,
    name: 'Learn Redux'
}))

store.dispatch(addGoalActionCreator({
    id: 1,
    name: 'Lose 20 pounds'
}))

store.dispatch(removeGoalActionCreator(0))
