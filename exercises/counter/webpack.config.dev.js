/* eslint-disable no-var, prefer-template */
var path = require('path');
var webpack = require('webpack');

// Set up dev host host and HMR host. For the dev host this is pretty self
// explanatory: We use a different live-reload server to server our static JS
// files in dev, so we need to be able to actually point a script tag to that
// host so it can load the right files. The HRM host is a bit stranger. For more
// details on why we need this URL see the readme and:
// https://github.com/glenjamin/webpack-hot-middleware/issues/37
var DEV_PORT = process.env.DEV_PORT || 3000;
var DEV_HOST = '//localhost:' + DEV_PORT + '/';
var HMR_HOST = DEV_HOST + '__webpack_hmr';

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    app: [
      'webpack-hot-middleware/client?path=' + HMR_HOST,
      'normalize.css',
      './client/App.css',
      './client/index.jsx',
    ],
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: DEV_HOST,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client'),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'autoprefixer'],
      },
    ],
  },

};
