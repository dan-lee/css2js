const parse = require('css/lib/parse')
const { camelize } = require('./util')

function parseDeclarations (declarations) {
  return declarations.reduce((styles, { type, value, property }) => {
    if (type === 'declaration') {
      const prop = camelize(property)
      styles[prop] = value
    }

    return styles
  }, {})
}

module.exports = declarations => {
  const obj = parse(`.example {${declarations}}`)

  const astDeclarations = obj.stylesheet.rules[0].declarations

  return parseDeclarations(astDeclarations)
}
