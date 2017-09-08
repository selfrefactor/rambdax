const R = require("../rambdax")


// append don't work with strings
test('',()=>{
  var truncate = R.when(
  x => x.length > 5,
  R.compose(x => `${x}...`, R.take(5))
)

expect(truncate('1234')).toEqual('1234')
expect(truncate('12345678')).toEqual('12345...')
})