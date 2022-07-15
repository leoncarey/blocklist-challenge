const assert = require('assert').strict
const { Parser } = require('../../../src/helpers')

describe('Parser tool test suite', function () {
  describe('Tests for Integer type', function () {
    it('Should convert string to Integer', function () {
      const stringValue = '42'
      const newInteger = Parser.parseInt(stringValue)
      assert(Number.isInteger(newInteger))
    })

    it('Should return Number to Integer value', function () {
      const stringValue = 42
      const newInteger = Parser.parseInt(stringValue)
      assert(Number.isInteger(newInteger))
    })

    it('Should return NaN to random string value', function () {
      const stringValue = 'foo'
      const newInteger = Parser.parseInt(stringValue)
      assert(isNaN(newInteger))
    })

    it('Should return NaN to object value', function () {
      const stringValue = { foo: 1 }
      const newInteger = Parser.parseInt(stringValue)
      assert(isNaN(newInteger))
    })

    it('Should return undefined to undefined value', function () {
      const stringValue = undefined
      const newInteger = Parser.parseInt(stringValue)
      assert(newInteger === undefined)
    })

    it('Should return undefined to null value', function () {
      const stringValue = null
      const newInteger = Parser.parseInt(stringValue)

      assert(newInteger === undefined)
    })
  })

  describe('Tests for Float/Double type', function () {
    it('Should convert string to Float', function () {
      const stringValue = '42.03'
      const newFloat = Parser.parseFloat(stringValue)
      assert(newFloat % 1 !== 0)
    })

    it('Should return Float to Float value', function () {
      const stringValue = 42.03
      const newFloat = Parser.parseFloat(stringValue)
      assert(newFloat % 1 !== 0)
    })

    it('Should return Integer to Integer value', function () {
      const stringValue = 42
      const newFloat = Parser.parseFloat(stringValue)
      assert(Number.isInteger(newFloat))
    })

    it('Should return NaN to random string value', function () {
      const stringValue = 'foo'
      const newFloat = Parser.parseFloat(stringValue)
      assert(isNaN(newFloat))
    })

    it('Should return undefined to undefined value', function () {
      const stringValue = undefined
      const newFloat = Parser.parseFloat(stringValue)
      assert(newFloat === undefined)
    })
  })

  describe('Test for Boolean type', function () {
    it('Should convert string "true" to Boolean', function () {
      const stringValue = 'true'
      const newBoolean = Parser.parseBoolean(stringValue)
      assert.equal(typeof newBoolean, 'boolean')
    })

    it('Should convert string "false" to Boolean', function () {
      const stringValue = 'false'
      const newBoolean = Parser.parseBoolean(stringValue)
      assert.equal(typeof newBoolean, 'boolean')
    })

    it('Should keep boolean "true" value', function () {
      const stringValue = true
      const newBoolean = Parser.parseBoolean(stringValue)
      assert.equal(typeof newBoolean, 'boolean')
    })

    it('Should keep boolean "false" value', function () {
      const stringValue = false
      const newBoolean = Parser.parseBoolean(stringValue)
      assert.equal(typeof newBoolean, 'boolean')
    })

    it('Should return undefined to undefined value', function () {
      const stringValue = undefined
      const newBoolean = Parser.parseBoolean(stringValue)
      assert(newBoolean === undefined)
    })

    it('Should return random string to random string value', function () {
      const stringValue = 'foo'
      const newBoolean = Parser.parseBoolean(stringValue)
      assert(newBoolean, stringValue)
    })
  })

  describe('Tests for Object and Array type', function () {
    it('Should convert string to Object', function () {
      const stringValue = '{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}}'
      const newObject = Parser.parseArrayObject(stringValue)
      assert.equal(typeof newObject, 'object')
    })

    it('Should convert string to Array', function () {
      const stringValue = '[1, 2, 3, 4]'
      const newArray = Parser.parseArrayObject(stringValue)
      assert.equal(Array.isArray(newArray), true)
    })

    it('Should return undefined to undefined value', function () {
      const stringValue = undefined
      const newObject = Parser.parseArrayObject(stringValue)
      assert(newObject === undefined)
    })

    it('Should return random string to random string value', function () {
      const stringValue = 'foo'
      const newObject = Parser.parseArrayObject(stringValue)
      assert.equal(newObject, stringValue)
    })
  })
})
