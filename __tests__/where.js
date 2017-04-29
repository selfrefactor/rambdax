const R = require("../rambdax")

describe("where",()=>{
    it("",()=>{
      var pred = R.where({
      a: R.equals('foo'),
      b: R.equals('bar')
      })
      expect(
        pred({a: 'foo', b: 'bar', x: 11, y: 19})
      ).toEqual(true)
    })
    
    it("",()=>{
      var pred = R.where({
      a: R.equals('foo'),
      b: R.equals('baz')
      })
      expect(
        pred({a: 'foo', b: 'bar', x: 11, y: 19})
      ).toEqual(false)
    })
})
