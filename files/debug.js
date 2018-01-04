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

const isSameValueZero = (value1, value2) => {
  return value1 === value2 || (value1 !== value1 && value2 !== value2)
}

const isEqual = (testValue, matchValue) => {
  return typeof testValue === 'function' ? 
    testValue(matchValue): 
    testValue instanceof RegExp ? 
      testValue.test(matchValue) : 
      isSameValueZero(testValue, matchValue)
}

const createCaseCreator = (isNot) => {

  return (testValue, matchResult = true) => {
    return {
      key: testValue,
      test: isNot
        ? (matchValue) => {
          return !isEqual(testValue, matchValue) ? matchResult : NO_MATCH_FOUND
        }
        : (matchValue) => {
          return isEqual(testValue, matchValue) ? matchResult : NO_MATCH_FOUND
        }
    }
  }
}

const is = createCaseCreator(false)
const not = createCaseCreator(true)

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

  not(testValue, matchResult) {

    return new Switchem(
      this.defaultValue, 
      [...this.cases, not(testValue, matchResult)], 
      this.willMatch
    )
  }
}

function switcher(input){
  return new Switchem(input)
}

const x = switcher('az')
  .is('bar', 'it is bar')
  .is('baz', 'it is baz')
  .default('it is')

  let a  