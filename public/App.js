import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'
import { css } from 'glamor'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import copy from 'copy-to-clipboard'

import parse from '../src/parse'
import render from '../src/render'

const styles = {
  app: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    userSelect: 'none',
    cursor: 'default'
  }),
  header: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    '> *': {
      margin: '0 20px'
    }
  }),
  arrow: css({
    fontSize: 80,
    color: '#bada55'
  }),
  main: css({
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around'
  }),
  column: css({
    display: 'flex',
    width: '50%',
    flex: 1,
  }),
  copy: css({
    position: 'absolute',
    right: 10,
    top: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  }),
  copyIcon: css({
    cursor: 'pointer',
  }),
  copied: css({
    background: 'rgba(0, 0, 0, .6)',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: 3,
    marginRight: 5,
    fontSize: 13,
    transition: '.5s',
    opacity: 0
  }),
  options: css({
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    margin: '20px 10px',
    '& div': {
      margin: '0 5px'
    }
  }),
  output: css({
    position: 'relative',
    display: 'flex',
    flex: 1
  })
}

export default class App extends Component {
  state = {
    input: `width: 600px;
min-height: 100vh;
font-weight: 800;
color: #bada55;
opacity: .5;
-webkit-font-smoothing: antialiased;
font-family: "Roboto", 'Open Sans';`,
    output: '',
    error: false,
    options: {
      noPx: true,
      preferDoubleQuotes: false,
      enforceQuotes: false,
      propertyQuotes: false
    },
    showCopied: false
  }

  componentWillMount () {
    this.handleInputChange(this.state.input)
  }

  convert = (input, options) => render(parse(input), options)

  handleInputChange = input => {
    let error = false
    let output
    try {
      output = this.convert(input, this.state.options)
    } catch (e) {
      console.error(e)
      output = e.message
      error = true
    }
    this.setState(() => ({ input, output, error }))
  }

  handleOptionChange = (option, e) => {
    const { checked } = e.target

    this.setState(prevState => {
      const options = { ...prevState.options, [option]: checked }
      return {
        options,
        output: this.convert(prevState.input, options)
      }
    })
  }

  handleCopyClick = () => {
    this.setState(() => ({ showCopied: true }))
    copy(this.state.output)
    setTimeout(() => this.setState(() => ({ showCopied: false })), 2000)
  }

  render () {
    return (
      <div {...styles.app}>
        <a href="https://github.com/dan-lee/css2js">
          <img
            style={{ position: 'absolute', top: 0, right: 0, border: 0 }}
            src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" />
        </a>
        <header {...styles.header}>
          <img height="110" src="img/css.png" />
          <span {...styles.arrow}>→</span>
          <img height="110" src="img/js.png" />
        </header>

        <div {...styles.options}>
          <div>Options:</div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={this.handleOptionChange.bind(this, 'noPx')}
                checked={this.state.options.noPx}
              /> Omit <code>px</code>
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={this.handleOptionChange.bind(this, 'preferDoubleQuotes')}
                checked={this.state.options.preferDoubleQuotes}
              /> Prefer double quotes
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={this.handleOptionChange.bind(this, 'enforceQuotes')}
                checked={this.state.options.enforceQuotes}
              /> Enforce quotes
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={this.handleOptionChange.bind(this, 'propertyQuotes')}
                checked={this.state.options.propertyQuotes}
              /> Quotes around property name
            </label>
          </div>
        </div>

        <div {...styles.main}>
          <div {...styles.column}>
            <CodeMirror
              value={this.state.input}
              onChange={this.handleInputChange}
              options={{
                lineNumbers: true,
                mode: 'css'
              }}
            />
          </div>
          <div {...styles.column}>
            <div {...styles.output}>
              <CodeMirror
                value={this.state.output}
                options={{
                  readOnly: true,
                  lineNumbers: true,
                  mode: 'javascript'
                }}
              />
              <div {...styles.copy}>
                <span {...css(styles.copied, { opacity: this.state.showCopied && 1 })}>Copied!</span>
                <svg {...styles.copyIcon} onClick={this.handleCopyClick} id="copy" width="16" height="16"
                     viewBox="0 0 24 24">
                  <path
                    d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
