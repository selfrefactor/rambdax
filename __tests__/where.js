const R = require("../rambdax")

describe("mergeAll",()=>{
    it("",()=>{
      expect(
        R.mergeAll([{foo:1},{bar:2},{baz:3}])
      ).toEqual({foo:1,bar:2,baz:3})
    })
})

describe("memoize",()=>{
    it("",()=>{
      var count = 0
      var tester = R.memoize(n => {
        count ++
        return n+6
      })  
      tester(5)
      tester(5)
      tester(5)
      
      expect(
        tester(5)
      ).toEqual(11)
      
      expect(
        count
      ).toEqual(1)
      
      tester(6)
      
      expect(
        tester(6)
      ).toEqual(12)
      
      expect(
        count
      ).toEqual(2)
    })
    
})

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
