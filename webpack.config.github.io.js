const merge = require('webpack-merge');
const wpcf = require('./webpack.config.js');
var path = require('path');

module.exports = merge(wpcf, {
    output: {
        // __dirname => the name of the directory that the code currently recidees in.
      path: path.resolve(__dirname, 'build/githubio'),
        // __dirname => the name of the directory that the code currently recidees in.
        publicPath: '/build/githubio',
    }
});
