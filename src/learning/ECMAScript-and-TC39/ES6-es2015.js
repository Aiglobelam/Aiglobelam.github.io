// ES6 is Ecma Script 2015.... sigh... never easy

// * var, let, const
// var - function scoped, initialzed with undefined
// let - blocked scope, initialized with ... refrence error will occur if we try to use it without it having any value...
// const - do not change ref, => not reasignable...  block scoped
// Try to use const in the first place! then let never var =)

// * Destructuring! 
const { getThis } = x; // instead of x.getThis;

// * Shorthand Property and Method Names in JavaScript ES6 | ES2015
const sp1 = 'xxx';
const sp2 = 'xxx';
const myFunc = () => { whaterver do it }
const x {
   sp1,
   sp2,
   myFunc
}
// use like this x.sp1 OR x.sp2 OR x.myFunc

// * Computed Property Names
// Before
function x(key, value) {
    let rv = {};
    rv[key] = value;
    return rv;
}
// After
function x(key, value) {
    return {
        [key]: value,
    }
}

// * Template litterals
const tl1v = 666;
const theString = `The number of the beast ${tl1v}`;

// * Arrow Functions
// - binds this
const myArrowFunc = (param) => { 
    return 'something';
}
// - smart console.log
// const myArrowFunc2 = (param, param2) => console.log(param, params2) || ({  return 'something';  });

// * Default parameters
const myArrowFunc3 = (param = 'defaultParamValue') => { 
    return 'something';
}

// * Compiling vs Polyfills with Babel
// - get hols of and use new features in different tc39 stages
// - BABEL: Compile/Transpile "new code" to old school code
//      - That does not solve all, sorry
//      - Polyfills are needed
//      Some examples
//      ARROW FUNCTIONS: compiled/transformed by Babel to ordinary functions
//      ES6 CLASSES    : compiled/transformed by Babel into regular functions 
//      PROMISES       : Bable can NOT transform that to old school JS... So promises neeeds to be Polyfilled
//      DESTRUCTURING  : compiled/transformed by Babel into normal variabel declarations
//      INCLUDES       : ['asdf'].includes(...); Can it not be transpiled to index.of??? which all browser support?
//                       Polyfill needed, Babel can not add new properties to any primitives.     
//      "fetch"        : fetch is not a part of ES6 there for it can not op transpiled by Babel to old code we need a plugin/polyfill
// LIST
// COMPILED (transform)     POLYFILLED (add new functionallity in browser)
// Arrow functions          ArrayBuffer
// Async functions          Array.from
// Block scoped functions   Array.of
// Classes                  Array#find
// Class properties         Array#findIndex
// Computed property names  Function#name
// Constants                Map
// Decorators               Number.isNaN
// Default parameters       Object.assign
// Destructuring            Object.entries
// Modules                  Object.values
// Object rest/spread       Promise
// Property method assignment Set
// Property name shorthand  String#includes
// Rest parameters          Symbol
// Spread ...               WeakMap