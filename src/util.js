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

  if (enforceQuotes) {
    return surround(value, quoteChr)
  }

  if (value.includes(`'`) && value.includes(`"`)) {
    const escapedValue = value.replace(new RegExp(quoteChr, 'g'), `\\${quoteChr}`)
    return surround(escapedValue, quoteChr)
  }

  if (preferDoubleQuotes && value.includes(`"`)) {
    return surround(value, `'`)
  }

  if (!preferDoubleQuotes && value.includes(`'`)) {
    return surround(value, `"`)
  }

  if (isUnitless(prop)) {
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

function isUnitless (prop) {
  return [
    'animationIterationCount',
    'boxFlex',
    'boxFlexGroup',
    'boxOrdinalGroup',
    'columnCount',
    'flex',
    'flexGrow',
    'flexPositive',
    'flexShrink',
    'flexNegative',
    'flexOrder',
    'gridRow',
    'gridColumn',
    'fontWeight',
    'lineClamp',
    'lineHeight',
    'opacity',
    'order',
    'orphans',
    'tabSize',
    'widows',
    'zIndex',
    'zoom',
    'fillOpacity',
    'stopOpacity',
    'strokeDashoffset',
    'strokeOpacity',
    'strokeWidth'
  ].indexOf(prop) > -1
}

module.exports = {
  camelize,
  quoteValue,
  surround
}
