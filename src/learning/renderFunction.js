// The render function in REACT should just
// * receive state
// * receive props
// * render UI based on state / props

// It should not
// * set state
// * set props
// Cause this will trigger a re-render in react, and then we have a continous forever loop


// ====> Change state props in Life Cycle Methods => app/learning/lifeCycleMethods.js