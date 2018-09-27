const { resolve } = require('path')
const { doModule } = require('do')

doModule({
  mode:'NODE',
  srcDirectory: resolve(__dirname, '../modules'),
  packageJson: resolve(__dirname, '../package.json')
}).then(console.log)