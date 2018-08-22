const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js',
  },
  devServer: {
    watchContentBase: true,
    proxy: {
      '/api': {
        target: 'http://192.168.1.148:3000',
        pathRewrite: { '^/api': '' },
      },
    },
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
