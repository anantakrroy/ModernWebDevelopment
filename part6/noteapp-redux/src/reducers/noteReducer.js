// A reducer is a function which takes current state and action as params
const noteReducer = (state = [], action) => {
  console.log('Action type : ', action.type);
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload];
    case 'TOGGLE_IMP': {
      const id = action.payload.id;
      const noteToChange = state.find((note) => note.id === id);
      console.log('Note to chnge >>> ', noteToChange);

      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      console.log(changedNote);

      return state.map((note) => (note.id === id ? changedNote : note));
    }
    default:
      return state;
  }
};

export default noteReducer;
