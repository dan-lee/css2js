const { quoteValue, surround } = require('./util')

module.exports = (parsed, options = {}) => {
  const chr = options.propertyQuotes ? (options.preferDoubleQuotes ? `"` : `'`) : ''
  const props = Object.keys(parsed)

  return props.length ? (
    '{\n' +
    props.map(prop => `  ${surround(prop, chr)}: ${quoteValue(prop, parsed[prop], options)}`).join(',\n') +
    '\n}'
  ) : ''
}
