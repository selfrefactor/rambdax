import { splitEveryWhen } from './splitEveryWhen'
import { pass } from './pass'

const mock = 'Wert 1; Wert 2,...Wert 30 sind Werte, aus denen die Anzahl der Argumente errechnet wird.'

test.only('mock', () => {
  const PER_LINE = 30
  const BUFFER = 6
  const predicate = (char, holder, answer, i) => {
    const mysteryLimit = (answer.length + 1) * PER_LINE
      
    if (char === ' '){
      const tooEarly = i + BUFFER < mysteryLimit
      const tooLate = mysteryLimit + BUFFER < i
      const okIndex = !(tooEarly || tooLate)
      return okIndex
    }

    return false
  }
  const input = [ ...mock ]

  const result = splitEveryWhen(predicate, input)
  const parsed = result.map(singleAnswer => singleAnswer.join(''))
  console.log({ parsed })
})

test('happy', () => {
  const predicate = (char, holder, answer, i) => {
    expect(pass(
      char,
      holder,
      answer,
      i
    )(
      String,
      Array,
      Array,
      Number
    )).toBeTruthy()

    return true
  }
  const input = [ ...'foo bar' ]

  const result = splitEveryWhen(predicate, input)
  expect(
    result[ 1 ]
  ).toEqual([])
})
