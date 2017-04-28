import React from 'react'
import { render } from 'react-dom'
import App from './App.js'

function renderApp () {
  render(<App />, document.getElementById('app'))
}

renderApp()

if (module.hot) {
  module.hot.accept('./App.js', renderApp)
}

