import noteReducer from './noteReducer';
import deepFreeze from 'deep-freeze';

describe('note reducer tests', () => {
  test('default state is empty list', () => {
    const state = [];
    const action = { type: undefined };
    deepFreeze(state);
    const newState = noteReducer(state, action);
    expect(newState).toEqual([]);
  });

  test('new note is added', () => {
    const state = [];
    const action = {
      type: 'NEW_NOTE',
      payload: {
        content: 'First note using redux store',
        important: true,
      },
    };

    deepFreeze(state);
    const newState = noteReducer(state, action);
    expect(newState).toEqual([
      {
        content: 'First note using redux store',
        important: true,
      },
    ]);
  });
});
