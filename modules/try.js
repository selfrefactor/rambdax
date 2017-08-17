function tryMethod (fn) {
  try {
    return fn()
  }
  catch (err) {
    return ({
      type: 'error',
      payload: err
    })
  }
}

module.exports = tryMethod
