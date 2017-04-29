const R = require("../rambdax")

describe("once",()=>{
    it("",()=>{
      const addOneOnce = R.once(x => x + 1)
      
      addOneOnce(10)
      expect(
        addOneOnce(40)
      ).toEqual(11)
    })
    
})

describe("tap",()=>{
    it("",()=>{
      var sayX = x => console.log('x is ' + x);
      expect(
        R.tap(sayX, 100)
      ).toEqual(100)
    })
    
})


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
