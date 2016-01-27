/**
 * @fileOverview Used to compile jeez
 * @name webpack.config.js
 * @source http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6
 */


var webpack = require('webpack');
var path = require('path');
var libraryName = 'jeez';

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: __dirname + '/src/jeez.js',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins,
  externals: {
    "three": "three"
  }
};

module.exports = config;
