const { doModule } = require('do')
const { resolve } = require('path')

doModule({
  mode         : 'NODE',
  srcDirectory : resolve(__dirname, '../src'),
  packageJson  : resolve(__dirname, '../package.json'),
}).then(console.log)
