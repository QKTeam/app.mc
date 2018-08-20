const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
