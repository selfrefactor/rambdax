const R = require('rambda')

const NO_MATCH_FOUND = Symbol('NO_MATCH_FOUND')

const getMatchingKeyValuePair = (cases, testValue, defaultValue) => {
  let iterationValue

  for (let index = 0; index < cases.length; index++) {
    iterationValue = cases[index].test(testValue)

    if (iterationValue !== NO_MATCH_FOUND) {
      return {
        key: cases[index].key,
        value: iterationValue
      }
    }
  }

  return {
    key: 'default',
    value: defaultValue
  }
}

const isEqual = (testValue, matchValue) => {
  const willReturn = typeof testValue === 'function' ? 
    testValue(matchValue): 
    R.equals(testValue, matchValue)
  
  return willReturn      
}

const is = (testValue, matchResult = true) => {
  return {
    key: testValue,
    test: (matchValue) => {
      return isEqual(testValue, matchValue) ? matchResult : NO_MATCH_FOUND
    }
  }
}

class Switchem {
  constructor(defaultValue, cases, willMatch) {
    if(defaultValue!== undefined && cases === undefined && willMatch === undefined){
      this.cases = []
      this.defaultValue = undefined
      this.willMatch = defaultValue
    }else{
      this.cases = cases
      this.defaultValue = defaultValue
      this.willMatch = willMatch
    }

    return this
  }

  default(defaultValue) {
    const holder = new Switchem( defaultValue, this.cases, this.willMatch)
    return holder.match(this.willMatch)
  }

  is(testValue, matchResult) {
    
    return new Switchem(
      this.defaultValue, 
      [...this.cases, is(testValue, matchResult)], 
      this.willMatch
    )
  }

  match(matchValue) {
    const {key, value} = getMatchingKeyValuePair(this.cases, matchValue, this.defaultValue)

    return typeof value === 'function' ? 
      value(key, matchValue) : 
      value
  }
}

function switcher(input){
  return new Switchem(input)
}

const a = true
const b = false
const result = switcher([a,b])
  .is([false, false], '0')
  .is([false, true], '1')
  .is([true, true], '2')
  .default('3')

  let aa  