// Component and PureComponent have one difference
// PureComponent is exactly the same as Component except that it handles the 
// shouldComponentUpdate method for you

// https://stackoverflow.com/questions/41340697/react-component-vs-react-purecomponent
// The major difference between React.PureComponent and React.Component 
// is PureComponent does a shallow comparison on state change. It means that
// when comparing scalar values it compares their values, but when comparing 
// objects it compares only references. It helps to improve the performance of
// the app.
//
// - - - - - - -
// PureComponent
// - - - - - - -
// You should go for React.PureComponent when you can satisfy any of the below conditions.
// * State/Props should be an immutable object
// * State/Props should not have a hierarchy
// * You should call forceUpdate when data changes
// If you are using React.PureComponent you should make sure all child components are also pure.

// Question: 
// Is there any performance impact in using React.component that we may consider 
// going for React.PureComponent?
// Answer:
// Yes, it will increase your app performance (because of shallow comparison)

// Question: 
// I am guessing shouldComponentUpdate() of Purecomponent performs only shallow
// comparisons . If this is the case can' t the said method used for deeper 
// comparisons? going for React.PureComponent?
// Answer:
// You guessed it correctly. You could use it if you satisfy any of the conditions I mentioned above.

// Question: 
// "Furthermore, React.PureComponent's shouldComponentUpdate() skips prop updates 
// for the whole component subtree" - Does this mean that prop changes are ignored?
// Answer:
// Yes, prop changes will be ignored If it couldn't find difference in shallow comparison.