const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js',
  },
  devServer: {
    inline: true,
    watchContentBase: true,
    port: 9000,
    proxy: {
      '/mc/api': {
        target: 'http://mc.dawnever.com',
        pathRewrite: {'^/mc/api' : '/api'},
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
};
