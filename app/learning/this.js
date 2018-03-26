// THE "THIS" KEYWORD
// - Implicit binding
// - Explicit binding
// - new binding
// - window binding

// QUESTION 1) Where is this function invoked?

//--------------------
// - Implicit binding 
// (Left of the dot at call time)
//--------------------
// ex 1)
var me = { name: 'Jens', age: '38', sayName: () => console.log(this.name) };
me.sayName(); // Jens

// ex 2)
var sayNameMixIn = obj => {
    obj.sayName = name => console.log(this.name)
}
var me2 = { name: 'Jes', age: '38'};
var you = { name: 'Maz', age: '38'};
// Decoreate with sayName
sayNameMixIn(me2);
sayNameMixIn(you);

me2.sayName(); // Jes
you.sayName(); // Maz

// ex 3)
var Person = (nameIn, ageIn) => { 
    return { 
        name: nameIn, 
        age: ageIn, 
        sayName: () => console.log(this.name),
        xxx: {
            name: 'Darth',
            age: 66,
            sayName: () => console.log(this.name),
        }
    } 
};

var s = Person('Santa', 99);
s.sayName(); // Santa
s.xxx.sayName(); // Darth

//--------------------
// - Explicit binding 
// call, apply, bind (state what the "this" is supposed to be)
//--------------------
var sayNameCAB = (lang1, lang2, lang3) => {
    obj.sayName = name => console.log(this.name, lang1, lang2, lang3);
}

var x2 = { name: 'x2', age: 3 };
// first argument to call is the "context" => the "this" will reference x2
sayNameCAB.call(x2); // x2

// first argument to call is the "context" => the "this" will reference x2
// second/third/... argument is going to be passed into the function
var languages = ['js', 'php', 'java'];
sayNameCAB.call(x2, languages[0], languages[1], languages[2]); // x2 js php java

sayNameCAB.apply(x2, languages); // x2 js php java (exactly same as "call")

// bind returns us a new function instead of invoking "sayNameCAB"
var newFunction = sayNameCAB.bind(x2, languages[0], languages[1], languages[2]);
newFunction(); /// x2 js php java



//--------------
// New binding
//--------------

var Animal = function (color, name, type) {
    color: color,
    name: name,
    type: type
};

// using the new keyword, js creates a new object, the "this" keyword are binund to the newly created keyboard
var zebra = new Animal('white', 'donkey', 'kong');

//----------------
// Window binding
//----------------
// if you are not using "new"  OR "call apply or bind" then "this" defaults to window object

var sayAgeW = () => console.log(this.age);
sayAgeW(); // undefined
window.age = 99;
sayAgeW(); // 99

// strict mode
var sayAgeWstrict = () => {
    'use strict';
    console.log(this.ageXXX);
}
sayAgeWStrict(); // "Type Error cannot read prop ageXXX of undefined" => this is undefined (it is not set to the "window" object)





















