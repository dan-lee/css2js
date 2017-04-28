const { resolve } = require('path')
const webpack = require('webpack')

const path = resolve(__dirname, 'public')

const plugins = []

const entry = [
  resolve(path, 'index.js')
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      screw_ie8: true,
      comments: false,
      sourceMap: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    })
  )
} else {
  entry.unshift('react-hot-loader/patch')
}

module.exports = {
  entry: entry,
  output: {
    filename: 'bundle.js',
    path: path
  },
  devServer: {
    contentBase: resolve(__dirname, 'public'),
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
  plugins: plugins
}
