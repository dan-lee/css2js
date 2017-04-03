const parse = require('../src/parse')
const render = require('../src/render')

const input = document.getElementById('input')
const output = document.getElementById('output')
const copyOutput = document.getElementById('copy-output')
const copiedOutput = document.getElementById('copied-output')

const optionNoPx = document.querySelector('[name=option-no-px]')
const optionQuotes = document.querySelector('[name=option-quote]')
const optionEnforce = document.querySelector('[name=option-enforce]')
const optionProperty = document.querySelector('[name=option-property]')

function debounce (func, wait, immediate) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

const options = {
  noPx: true,
  preferDoubleQuotes: false,
  enforceQuotes: false,
  propertyQuotes: false
}

function updateOutput (value) {
  try {
    const parsed = parse(value)
    output.classList.remove('err')
    output.value = render(parsed, options)
    resetHeight(output)
  } catch (e) {
    output.classList.add('err')
    output.value = e
  }
}

function resetHeight (element) {
  element.style.height = 0
  element.style.height = `${element.scrollHeight - 20}px`
}

input.addEventListener('keyup', debounce(e => {
  updateOutput(e.target.value)
}, 250))

input.addEventListener('keydown', e => {
  const insert = ' '
  if (e.keyCode === 9 || e.which === 9) {
    e.preventDefault()
    const s = input.selectionStart
    input.value = input.value.substring(0, input.selectionStart) + insert + input.value.substring(input.selectionEnd)
    input.selectionEnd = s + insert.length
  }
})

copyOutput.addEventListener('click', e => {
  output.select()
  document.execCommand('copy')

  copiedOutput.style.opacity = 1
  setTimeout(() => copiedOutput.style.opacity = 0, 2000)
})

optionNoPx.addEventListener('change', e => {
  options.noPx = e.target.checked
  updateOutput(input.value)
})
optionQuotes.addEventListener('change', e => {
  options.preferDoubleQuotes = e.target.checked
  updateOutput(input.value)
})
optionEnforce.addEventListener('change', e => {
  options.enforceQuotes = e.target.checked
  updateOutput(input.value)
})
optionProperty.addEventListener('change', e => {
  options.propertyQuotes = e.target.checked
  updateOutput(input.value)
})

input.focus()
