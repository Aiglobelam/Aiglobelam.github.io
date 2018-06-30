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
   // 1) Where are the starting point of your application / root JavaScript file.
   entry: ['./src/index.js',],
   module: {
      rules: [
          // Execure babel-loader on all *.js files
          // Looks in package.json for "babel" presets array
          // "env"   => we are able to use modern JS syntax in our codebase
          // "react" => React will be transpiled to JS code
          { test: /\.(js)$/, use: 'babel-loader' },
          // style-loader
          // Take css and insert on page so css becomes active
          // css-loader
          // Any time it sees an import or url('') those will be changed to require('') statements
          { test: /\.css$/, use: [ 'style-loader', 'css-loader'] }
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
   mode: 'development'
}
