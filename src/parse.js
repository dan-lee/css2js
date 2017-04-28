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
  try {
    const obj = parse(declarations)

    if (obj.type === 'stylesheet') {
      return obj.stylesheet.rules.reduce((allDeclarations, rule) => {
        if (rule.type === 'rule') {
          allDeclarations.push({
            selector: rule.selectors,
            declarations: parseDeclarations(rule.declarations)
          })
        }
        return allDeclarations
      }, [])
    }

  } catch (e) {
    const obj = parse(`.tmp-placeholder {${declarations}}`)

    return [{
      selector: undefined,
      declarations: parseDeclarations(obj.stylesheet.rules[0].declarations)
    }]
  }
}
