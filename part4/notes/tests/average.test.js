const { test, describe } = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average

describe('average', () => {
  test('of many is calculated right', () => {
    const result = average([1, 2, 3, 4, 5])
    assert.strictEqual(result, 3)
  })

  test('of one value is the value itself', () => {
    const result = average([1])
    assert.strictEqual(result, 1)
  })

  test('of empty array is 0', () => {
    const result = average([])
    assert.strictEqual(result, 0)
  })
})
