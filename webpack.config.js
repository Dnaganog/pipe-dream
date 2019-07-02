const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, '/client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  devServer: {
    publicPath: '/build',
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
      },
    ],
  },
};
