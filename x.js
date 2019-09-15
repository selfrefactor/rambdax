const child_process = require('child_process')

const execNodeFile = ({ file, cwd }) =>
  new Promise((resolve, reject) => {
    const child = child_process.spawn('node', [ file ], { cwd })
    const logs = []

    child.stdout.on('data', chunk => {
      const sk = chunk.toString()
      logs.push(sk)
    })

    child.stderr.on('data', err => {
      reject(err.toString())
    })
    child.stderr.on('end', () => {
      resolve(logs)
    })
  })

execNodeFile({
  cwd  : __dirname,
  file : '/home/matrix/repos/rambdax/files/wontDo/createRecordProve.js',
})
  .then(console.log)
  .catch(console.log)
