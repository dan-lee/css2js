const { resolve } = require('path')

const path = resolve(__dirname, 'public')

module.exports = {
  entry: resolve(path, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path
  }
}
