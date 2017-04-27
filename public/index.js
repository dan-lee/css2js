import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
  render () {
    return (
      <div id="app">
        <a href="https://github.com/dan-lee/css2js">
          <img
            style={{ position: 'absolute', top: 0, right: 0, border: 0 }}
            src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" />
        </a>
        <header>
          <img height="110" src="css.png" />
          <span id="arrow">→</span>
          <img height="110" src="js.png" />
        </header>
        <div className="row">
          <div className="col">
            <textarea cols="1" rows="1" id="input" />
          </div>
          <div className="col">
            <textarea cols="1" rows="1" id="output" readOnly />
            <div className="copy">
              <span id="copied-output">Copied!</span>
              <svg width="16" height="16" viewBox="0 0 24 24" id="copy-output" className="textarea-icon">
                <path
                  d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
                />
              </svg>
            </div>
          </div>
          <div>
            <ul id="options">
              <li>
                <label>
                  <input type="checkbox" name="option-no-px" checked />
                  Omit <code>px</code> suffix (helpful for React)
                </label>
              </li>
              <li><label><input type="checkbox" name="option-quote" /> Prefer double quotes</label></li>
              <li><label><input type="checkbox" name="option-enforce" /> Enforce quotes everywhere</label></li>
              <li><label><input type="checkbox" name="option-property" /> Quotes around property name</label></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))

// const parse = require('../src/parse')
// const render = require('../src/render')
//
// const input = document.getElementById('input')
// const output = document.getElementById('output')
// const copyOutput = document.getElementById('copy-output')
// const copiedOutput = document.getElementById('copied-output')
//
// const optionNoPx = document.querySelector('[name=option-no-px]')
// const optionQuotes = document.querySelector('[name=option-quote]')
// const optionEnforce = document.querySelector('[name=option-enforce]')
// const optionProperty = document.querySelector('[name=option-property]')
//
// function debounce (func, wait, immediate) {
//   let timeout
//   return function () {
//     const context = this
//     const args = arguments
//     const later = () => {
//       timeout = null
//       if (!immediate) func.apply(context, args)
//     }
//
//     const callNow = immediate && !timeout
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//     if (callNow) func.apply(context, args)
//   }
// }
//
// const options = {
//   noPx: true,
//   preferDoubleQuotes: false,
//   enforceQuotes: false,
//   propertyQuotes: false
// }
//
// function updateOutput (value) {
//   resetHeight(input)
//   try {
//     const parsed = parse(value)
//     output.classList.remove('err')
//     output.value = render(parsed, options)
//     resetHeight(output)
//   } catch (e) {
//     output.classList.add('err')
//     output.value = e
//   }
// }
//
// function resetHeight (element) {
//   element.style.height = 0
//   element.style.height = `${element.scrollHeight - 20}px`
// }
//
// input.addEventListener('keyup', debounce(e => {
//   updateOutput(e.target.value)
// }, 250))
//
// input.addEventListener('keydown', e => {
//   const insert = ' '
//   if (e.keyCode === 9 || e.which === 9) {
//     e.preventDefault()
//     const s = input.selectionStart
//     input.value = input.value.substring(0, input.selectionStart) + insert + input.value.substring(input.selectionEnd)
//     input.selectionEnd = s + insert.length
//   }
// })
//
// copyOutput.addEventListener('click', e => {
//   output.select()
//   document.execCommand('copy')
//   output.blur()
//
//   copiedOutput.style.opacity = 1
//   setTimeout(() => copiedOutput.style.opacity = 0, 2000)
// })
//
// optionNoPx.addEventListener('change', e => {
//   options.noPx = e.target.checked
//   updateOutput(input.value)
// })
// optionQuotes.addEventListener('change', e => {
//   options.preferDoubleQuotes = e.target.checked
//   updateOutput(input.value)
// })
// optionEnforce.addEventListener('change', e => {
//   options.enforceQuotes = e.target.checked
//   updateOutput(input.value)
// })
// optionProperty.addEventListener('change', e => {
//   options.propertyQuotes = e.target.checked
//   updateOutput(input.value)
// })
//
// input.value = `width: 600px;
//   min-height: 100vh;
//   font-weight: 800;
//   color: #bada55;
//   opacity: .5;
//   -webkit-font-smoothing: antialiased;
//   font-family: "Roboto", 'Open Sans';`
//
// updateOutput(input.value)
// input.focus()
//
