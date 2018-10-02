const testFile = `isValid.spec.js`

const command0 = `node node_modules/jest/bin/jest.js -- modules/${testFile}`
const command1 = `node node_modules/jest/bin/jest.js -- modules/${testFile} --runInBand`
const command2 = `node node_modules/jest/bin/jest.js -- modules/${testFile} --noStackTrace --runInBand --env=node`
const command3 = `node node_modules/jest/bin/jest.js -- modules/${testFile} --env=node`

const commands = [
  command1,
  command2,
  command0,
  command3,
]

const R = require('../dist/rambdax.js')
console.log(R.allTrue);
console.log(R.allTrue(1,2,3));

const {exec} = require('child_process')
const cwd = process.cwd()

void async function(){
  let counter = -1
  for(const command of commands){
    counter++
    await execCommand(command, counter)
  }
}()

function execCommand(command, tag){
  console.time(tag)
	return new Promise((resolve, reject) => {
    exec(command, {cwd}, (error, stdout, stderr) => {
      console.timeEnd(tag)
			if (error) {
				return reject({ error, stdout, stderr });
			}
			resolve({ stdout, stderr });
		});
	});
}