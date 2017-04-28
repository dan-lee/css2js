const { quoteValue, surround, indent } = require('./util')

function renderDeclarations (declarations, options, indentation) {
  const chr = options.propertyQuotes ? (options.preferDoubleQuotes ? `"` : `'`) : ''
  const props = Object.keys(declarations)

  return props.length
    ? (props.map(prop => {
      return indent(`${surround(prop, chr)}: ${quoteValue(prop, declarations[prop], options)}`, indentation)
    }).join(',\n'))
    : ''
}

module.exports = (parsed, options = {}) => {
  if (parsed.length === 1 && parsed[0].selector === undefined) {
    return '{\n' + renderDeclarations(parsed[0].declarations, options, 2) + '\n}'
  }
  const chr = options.preferDoubleQuotes ? `"` : `'`

  return '{\n' +
    parsed.map(({ selector, declarations }) => {
      return (
        indent((selector ? `${surround(selector.join(', '), chr)}: ` : ''), 2) + '{\n' +
        renderDeclarations(declarations, options, 4) + '\n' +
        indent('}', 2)
      )
    }).join(',\n') +
    '\n}'
}
