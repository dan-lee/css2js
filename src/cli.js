const { createInterface } = require('readline')
const parse = require('./parse')
const render = require('./render')

const rl = createInterface(process.stdin, process.stdout)

const lines = []

rl.write('Enter CSS:\n')
rl.prompt()
rl.on('line', line => {
  if (line !== '') {
    lines.push(line)
  } else {
    const parsed = parse(lines.join(' '))
    const literal = render(parsed)
    // console.log('Copied to clipboard:')
    console.log(literal)
    // pbcopy(literal)
    lines.length = 0

    process.exit(0)
  }
})
