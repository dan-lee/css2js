const { createInterface } = require('readline')
const parse = require('./parse')
const render = require('./render')
// const { spawn } = require('child_process')

const rl = createInterface(process.stdin, process.stdout)

// function pbcopy (data) {
//   const proc = spawn('pbcopy')
//   proc.stdin.write(data)
//   proc.stdin.end()
//   proc.kill()
// }

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
