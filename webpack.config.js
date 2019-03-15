const path = require('path');
const config = require('./.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[hash].bundle.js',
  },
  devServer: {
    contentBase: './build',
    open: true,
    hot: true,
    port: 9000,
    proxy: {
      '/mc/api': {
        target: config.proxyTarget || 'http://192.168.1.102:3000',
        pathRewrite: {'^/mc/api' : config.proxyPrefix || ''},
        changeOrigin: true,
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
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('index.html'),
      hash: true,
    }),
  ],
};
