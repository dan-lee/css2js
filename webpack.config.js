const { resolve } = require('path')
const webpack = require('webpack')

const path = resolve(__dirname, 'public')

module.exports = {
  entry: resolve(path, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path
  },
  devServer: {
    contentBase: resolve(__dirname, 'public'),
    hot: true,
    inline: true,
    overlay: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true
      }
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
