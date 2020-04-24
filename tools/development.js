const merge = require('webpack-merge');
const base = require('./base');
const path = require('path');

const BASEPATH = path.resolve(__dirname, '..', 'dist');

module.exports = merge(base, {
  mode: 'development',
  output: {
    path: path.resolve(BASEPATH, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name]-[id].bundle.js',
    publicPath: '/',
    libraryTarget: 'umd',
  },

  devServer: {
    port: 5000,
    host: 'localhost',
    hot: true,
  },
});