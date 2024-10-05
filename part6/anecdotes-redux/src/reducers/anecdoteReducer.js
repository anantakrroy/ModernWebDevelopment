let anecdotes = [
  {
    id: 1,
    anecdote:
      "I once camped under the stars, only to wake up covered in ants instead of stardust.",
  },
  {
    id: 2,
    anecdote:
      "I mistook a dolphin fin for a shark while snorkeling, swam faster than I ever thought possible.",
  },
  {
    id: 3,
    anecdote:
      "Hiking a mountain for sunrise, I got lost—found the best view at sunset instead.",
  },
  {
    id: 4,
    anecdote:
      "Slept in a hammock under the northern lights, but woke up freezing when the wind flipped me over.",
  },
  {
    id: 5,
    anecdote:
      "Took a picture of the Milky Way, only to realize my lens cap was on the entire time.",
  },
  {
    id: 6,
    anecdote:
      "On a safari, the guide told us to stay calm around lions—my camera’s 'low battery' beep ruined that.",
  },
  {
    id: 7,
    anecdote:
      "In the Sahara, I tried to race a camel. Let’s just say, I’m still eating sand.",
  },
];

anecdotes = anecdotes.map((el) => (el = { ...el, votes: 0 }));
console.log("Anecdotes >>> ", anecdotes);

const anecdoteReducer = (state = anecdotes, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE': {
      return [...state, action.payload]
    }
    case "VOTE": {
      const toUpdate = state.find((el) => el.id == action.payload.id);
      return state.map(el => el.id == toUpdate.id ? {...toUpdate, votes: toUpdate['votes']+1} : el).sort((a,b) => b.votes - a.votes)
    }
    default: {
      return state;
    }
  }
};

export default anecdoteReducer;
