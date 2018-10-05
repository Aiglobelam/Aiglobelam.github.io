// Controlled component
// FORMS:
//   Instead of going into the DOM and grab the value.
//   Bind value of the input field, to whatever the property on the state object is.
//
//   Sounds backwards...
//   But typically you would type something into the inputfield and then update the state.
//   
//   Bind inputfield to whatever the state value is.
//   So whenever you update the state, what is shown in the inputfield is going to change.
//   This is called a "Controlled component" 
//   REACT is CONTROLLING the value of the specific input field.

// Un controlled component
// Instead of binding the input value in the form field to the state,
// When user clicks commit, you "grab" value from the DOM and commit/set state