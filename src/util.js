const isUnitlessCSSProperty = require('unitless-css-property')

function camelize (str) {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

function surround (val, by) {
  return by + val + by
}

function quoteValue (prop, value, { noPx = true, preferDoubleQuotes = false, enforceQuotes = false }) {
  const quoteChr = preferDoubleQuotes ? `"` : `'`

  if (value.includes('\n')) {
    return surround(value, '`')
  }

  if (enforceQuotes || (value.includes(`'`) && value.includes(`"`))) {
    const escapedValue = value.replace(new RegExp(quoteChr, 'g'), `\\${quoteChr}`)
    return surround(escapedValue, quoteChr)
  }

  if (preferDoubleQuotes && value.includes(`"`)) {
    return surround(value, `'`)
  }

  if (!preferDoubleQuotes && value.includes(`'`)) {
    return surround(value, `"`)
  }

  if (isUnitlessCSSProperty(prop)) {
    return (
      /px$/.test(value) || /^[a-z]*$/.test(value)
        ? surround(value, quoteChr)
        : value
    )
  }

  if (/^\d*\.?\d+$/.test(value)) {
    return value
  }

  if (noPx && /^[\d.]+px$/.test(value)) {
    return value.slice(0, -2)
  }

  return surround(value, quoteChr)
}

function indent (str, len) {
  return ' '.repeat(len) + str
}

module.exports = {
  camelize,
  quoteValue,
  surround,
  indent
}
