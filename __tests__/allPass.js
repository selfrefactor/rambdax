const R = require("../rambdax")

describe("allPass",()=>{
  const obj = {a:1,b:2}
  it("when returns true",()=>{
    const conditionArr = [
    val => val.a === 1,
    val => val.b === 2,
    ]
    expect(
      R.allPass(conditionArr,obj)
    ).toBeTruthy()
  })  
  
  it("when returns false",()=>{
    const conditionArr = [
    val => val.a === 1,
    val => val.b === 3,
    ]
    expect(
      R.allPass(conditionArr,obj)
    ).toBeFalsy()
  })  
})  
