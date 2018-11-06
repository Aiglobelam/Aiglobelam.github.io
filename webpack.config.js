//----------------
// WEBPACK CONFIG
//----------------
// 1) Where are the starting point of your application / root JavaScript file.
// 2) Which transformations to execute on code.
// 3) Where to place the transformed code.

var path = require('path');

// This plugin is used to generate an HTML5 file that includes all your webpack bundles 
// in the body using <script ../> tags. Just add the plugin to your webpack config.
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 1) entyry: Where are the starting point of your application / root JavaScript file.
    //    * @babel/polyfill:
    //      https://babeljs.io/docs/en/babel-polyfill
    //      Can be used in webpack several diffrent ways. In our case we to not specift "useBuiltIns" any where...
    //      RULE: If useBuiltIns key is not specified or it is explicitly set with useBuiltIns: false
    //            in your .babelrc, add @babel/polyfill directly to the entry array in your webpack.config.js.
    //            Which is what we do here.
    //      @babel/polyfill: Babel includes a polyfill that includes a custom regenerator runtime and
    //      core-js. This will emulate a full ES2015+ environment (no < Stage 4 proposals) and is 
    //      intended to be used in an application rather than a library/tool. (this polyfill is 
    //      automatically loaded when using babel-node). This means you can use new built-ins like Promise
    //      or WeakMap, static methods like Array.from or Object.assign, instance methods like 
    //      Array.prototype.includes, and generator functions (provided you use the regenerator plugin)
    //      The polyfill adds to the global scope as well as native prototypes like String in order to do this.
    //    * whatwg-fetch
    //      A Polyfill for fetch (which is a XMLHttpRequest killer) or a replacement for libraries such as Axios
    //      It is pretty well supported in the browsers.
    //      https://caniuse.com/#feat=fetch
    //      Module: https://github.com/github/fetch
    entry: ['@babel/polyfill', 'whatwg-fetch', './src/index.js'],
    module: {
        rules: [
            // Execure babel-loader on all *.js files
            // Looks in package.json for "babel" presets array
            // "env"   (preset-env)   => we are able to use modern JS syntax in our codebase
            // "react" (preset-react) => React will be transpiled to JS code
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        // https://babeljs.io/docs/plugins/transform-class-properties/
                        // Use arrow notation on class fields (skipping bind this...)
                        // Allow us to add specific properties to our components/classes
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            // style-loader
            // Take css and insert on page so css becomes active
            // css-loader
            // Any time it sees an import or url('') those will be changed to require('') statements
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
