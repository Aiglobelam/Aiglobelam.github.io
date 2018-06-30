const merge = require('webpack-merge');
const wpcf = require('./webpack.config.js');
var path = require('path');

// Build with this config to test the "github.io" functionallity.
// This configuration is currently used in package.json
// to be used on "npm run build:githubio" to put code
// in correct directory "/build/githubio"
// Also tells where to load all assets from in this build...
// This folder "/build/githubio" is currently used in /index.html
// That is the file that github.io will look for in order to show a page.
// index.html will load "build/githubio/index.html" in an iframe =)
module.exports = merge(wpcf, {
    output: {
        // __dirname => the name of the directory that the code currently recidees in.
        path: path.resolve(__dirname, 'build/githubio'),
        // Sets basepath for all of our assets!
        // This is the root folder, used as a basepath for where files will be looked on upon.
        publicPath: '/build/githubio',
    }
});
