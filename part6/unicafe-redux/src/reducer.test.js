import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const state = {
      good: 0,
      ok : 0,
      bad : 0
    }
    const action = {type : 'OK'}

    deepFreeze(state)

    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const state = {
      good: 10,
      ok: 5,
      bad: 4
    }
    const action = {type: 'BAD'}

    deepFreeze(state)

    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 10,
      ok: 5,
      bad: 5
    })
  })

  test('zero resets the state', () => {
    const state = {
      good: 3,
      bad : 3,
      ok : 19
    }
    const action = {type: 'ZERO'}

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 0,
      bad: 0,
      ok: 0
    })
  })
})