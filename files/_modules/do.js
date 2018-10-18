const { doModule } = require('do')
const { resolve } = require('path')

doModule({
  mode         : 'NODE',
  srcDirectory : resolve(__dirname, '../../src'),
}).then(console.log)