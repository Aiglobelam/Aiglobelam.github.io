var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: ['./app/index.js',],
   module: {
      rules: [],
   },
   // __dirname => the name of the directory that the currently recidees in.
   output: {
      // Where to place transformed code
      path: path.resolve(__dirname, 'dist'),
      // filename => Name of file webpack should create, contains all transformed code
      filename: 'index_bundle.js',
   },
   plugins: [
      // Use our ordinary app/index.html file as a "template"
      // then create new index.html file in the "dist" folder as specified by "output.path" above.
      // Then it will "inject" a <script> tag that points to our built 'index_bundle.js' file
      // as specified in "output.filename"
      new HtmlWebpackPlugin({
         // template is wrong it must be something else...
         template: 'app/index.html'
      }),
   ],
   // 'development' => This will enable things like tooling for debugging and faster builds.
   mode: 'development'
}
