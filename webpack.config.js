//----------------
// WEBPACK CONFIG
//----------------
// 1) Where are the starting point of your application / root JavaScript file?
// 2) Which transformations to execute on code?
// 3) Where to place the transformed code?

var path = require('path');

// This plugin is used to generate an HTML5 file that includes all your webpack bundles 
// in the body using <script ../> tags. Just add the plugin to your webpack config.
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // ---------
    // 1) entry: Specifies starting point of your application / root JavaScript file.
    // ---------
    //    * @babel/polyfill:
    //      https://babeljs.io/docs/en/babel-polyfill
    //      Can be used in webpack several diffrent ways...
    //      RULEs: 
    //       - In file .babelrc
    //       - If "useBuiltIns" key is not specified => (nope I do not even have a .babelrc)
    //       - Or if useBuiltIns is explicitly set with a value like useBuiltIns: false => (nope have not done that)
    //      SOLUTION:
    //       - Add @babel/polyfill directly to the entry array in your webpack.config.js => (Which is what we done below)
    //      WHAT IS @babel/polyfill?
    //       - Babel includes a polyfill that includes a custom regenerator runtime and core-js.
    //         This will emulate a full ES2015+ environment (no < Stage 4 proposals) and is 
    //         intended to be used in an application rather than a library/tool. (This polyfill is 
    //         automatically loaded when using babel-node). This means you can use new built-ins like Promise
    //         or WeakMap, static methods like Array.from or Object.assign, instance methods like 
    //         Array.prototype.includes, and generator functions (provided you use the regenerator plugin)
    //         The polyfill adds to the global scope as well as native prototypes like String in order to do this.
    //    * whatwg-fetch
    //      https://github.com/github/fetch
    //      WHAT IS whatwg-fetch?
    //       - A Polyfill for fetch (which is a XMLHttpRequest killer) or a replacement for libraries such as Axios
    //         It is pretty well supported in the browsers.
    //         https://caniuse.com/#feat=fetch 
    entry: ['@babel/polyfill', 'whatwg-fetch', './src/index.js'],
    // WEBPACK:
    //  - Knows only javascript and JSON files, so when we want it to pack any other type of resources like .css or .scss or .ts. 
    //    Webpack needs help in order to compile and bundle those non-javascript types of resources.
    // LOADERS:
    //  - Configured in module.rules array
    //  - The node-based utilities built for webpack to help webpack to compile and/or transform a given type of resource
    //    so that it can be bundled as a javascript module.
    //  - Loaders load from bottom to top and right to left
    //  - ACTIVATION:
    //     - In src code/files loaders are activated/used by using "loadername!" prefixes in require() statements.
    //        ex) if the loader name is "base64-image"
    //            var fileAsBase64Src = require("base64-image!./file.png");
    //            document.write('<img src="' + fileAsBase64Src + '" />';
    //     - In webpack config applied using "test:" regex (which is the file you are reading right now)
    module: {
        // rules replaces "loaders" since webpack 2, https://webpack.js.org/migrate/4/#module-loaders
        // The rule at the bottom of the "rules" array are the rule/loader that are run first.
        rules: [
            // Execute babel-loader on all *.js files
            // Looks in package.json for "babel" presets array => (I do not have that, specified at options instead)
            // "env"   (preset-env)   => We are able to use modern JS syntax in our codebase
            // "react" (preset-react) => React will be transpiled to JS code
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        // https://babeljs.io/docs/plugins/transform-class-properties/
                        // Use arrow notation on class fields (skipping us to bind this...)
                        // Allow us to add specific properties to our components/classes
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            // Notice that loaders used like this are applied from right to left so 1st css-loader 2nd style-loader is run
            // 2) style-loader
            //  - Adds CSS to the DOM by injecting a <style> tag
            //  - Take css and insert on page so css becomes active
            //  - By default, the style-loader inserts the <style> elements into the <head> tag of the page.
            // 1) css-loader
            //  - Looks in source code/files as specified by test:
            //  - Searches for "@import" and "url(..)" in found code/files and
            //    treats/changes them to import/require() and resolves them.
            //  - css-loader is the npm module that would help webpack to collect CSS
            //    from all the css files referenced in your application and put it into a string.
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ],
    },
    // 3) Where to place the transformed code.
    output: {
        // __dirname => the name of the directory that the code currently recidees in.
        path: path.resolve(__dirname, 'build/prod'),
        // filename => Name of file webpack should create, contains all transformed code
        filename: 'appIndexBundle.js',
        // Sets basepath for all of our assets!?
        // This was added to get page reload requests to paths like /popular to not be  "Cannot GET /popular'. 
        // This is used in conjunction with the "devServer historyApiFallback: true,"
        publicPath: '/',
    },
    devServer: {
        // Whenever our app see url like '/popular', instead of invoking assets at "slash popular"
        // It will redirect to root path that we set in output.publicPath = '/'
        // React Router will notice this, and load the Route for "/popular"
        historyApiFallback: true,
    },
    plugins: [
        // Use our ordinary app/index.html file as a "template" for HtmlWebpackPlugin
        // HtmlWebpackPlugin then creates a new index.html file in the "dist" folder as specified by "output.path" above.
        // Then HtmlWebpackPlugin will "inject" a <script> tag that points to our built 'appIndexBundle.js' 
        // file as specified in "output.filename"
        new HtmlWebpackPlugin({
            // WARNING IN BUILD
            // "Entrypoint undefined = index.html" 
            // Solution: nope issue in newest webpack, guess it will be solved later on.
            // https://github.com/jantimon/html-webpack-plugin/issues/895
            // "template" => 
            template: 'src/index.html'
        }),
    ],
    // 'development' => This will enable things like tooling for debugging and faster builds.
    // As of writing process.env.NODE_ENV is set in package.json build scripts
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}
