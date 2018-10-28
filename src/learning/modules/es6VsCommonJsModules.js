
//--------------------------
// Revealing Module Pattern
//--------------------------
// First came Revealing Module Pattern
var revealingModule = (function () {
 
    var privateVar = "private var",
    var publicVar = "public var";

    function privateFunction() {
        console.log( "private function");
    }

    function publicFunction( param ) {
        privateVar = param;
    }

    // Return things that should be publicly available
    return {
        perhapsRenameTheFunctionIfYouLike: publicFunction,
    };

})();

revealingModule.perhapsRenameTheFunctionIfYouLike("data"); // => OK
revealingModule.publicFunction("data"); // => NOT OK because it is not returned
revealingModule.privateFunction("data"); // => NOT OK because it is not returned

// CommonJS
// * exports
// * require

//-----------
// ES6
//-----------
// * export
// * import