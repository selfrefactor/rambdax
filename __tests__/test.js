const R = require("../rambdax")

describe("rangeBy",()=>{
    it("",()=>{
      expect(
        R.rangeBy(0,10,2)
      ).toEqual([0, 2, 4, 6, 8, 10])
    })
    it("",()=>{
      expect(
        R.rangeBy(0,1,0.2)
      ).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1.0])
    })
    it("",()=>{
      expect(
        R.rangeBy(0,2,0.3)
      ).toEqual([0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8])
    })
})

describe("pickBy",()=>{
  it("",()=>{
    const input = {a:1,b:2,c:3,d:4}
    const fn = val => val > 2
    const expectedResult = {c:3,d:4 }
    expect(R.pickBy(fn,input)).toEqual(expectedResult)
  })  
})  

describe("omitBy",()=>{
  it("",()=>{
    const input = {a:1,b:2,c:3,d:4}
    const fn = val => val < 3
    const expectedResult = {c:3,d:4 }
    expect(R.omitBy(fn,input)).toEqual(expectedResult)
  })  
})  