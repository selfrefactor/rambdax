const R = require("../rambdax")

describe("once", () => {
  it("",()=>{
    let counter = 0
    const once = R.once((x)=>{
      counter++
      return x+2
    })
    once(1)
    once(1)
    once(1)
    once(1)
    expect(counter).toEqual(1)
  })
})
