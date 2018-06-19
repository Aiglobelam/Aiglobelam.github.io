// Covers using modules in Node. Not in the browser.
// Browser https://www.sitepoint.com/javascript-modules-bundling-transpiling/

// Module => encapsulates related code into a single unit of code.


const exports = module.exports = {};

exports.sayHelloInEnglish = function() {
    return "HELLO";
  };
  
  exports.sayHelloInSpanish = function() {
    return "Hola";
  };

// OR better more consice

module.exports = {
    sayHelloInEnglish: function() {
      return "HELLO";
    },
  
  sayHelloInSpanish: function() {
      return "Hola";
    }
};

//----------------------------------
// Importing a Module in other file
//----------------------------------
// if greetings.js was the file with the above content inside...
// The keyword require is used in Node.js to import modules.
// Keyword require returns an object, references the value of module.exports for a given file.
const greetings = require("./greetings.js"); 


//-------------------
// Require VS Import
//-------------------

// ES6 (Modules)
// export <=> import

// named export
export { myFunction }; 
export const foo = Math.sqrt(2);

// default export
export default function() {}
export default class {}

// Import examples
import { converter } from './converter';
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";

// Oldschool JS / node
// module.exports <=> require
// converter.js
module.exports = {
    sayHelloInEnglish: function() {
      return "HELLO";
    },
  
  sayHelloInSpanish: function() {
      return "Hola";
    }
};

const converter = require('./converter');
converter.sayHelloInEnglish();