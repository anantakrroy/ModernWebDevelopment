import "./App.css";
import { incVotes, createAnecdote } from "./reducers/anecdoteReducer";
import {useDispatch, useSelector} from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const handleVote = (id) => {
    dispatch(incVotes(id))
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const anecdote = e.target.newanecdote.value
    e.target.newanecdote.value = ''
    const id = anecdotes.length + 1
    dispatch(createAnecdote({id: id, anecdote: anecdote, votes: 0}))
  }

  return (
    <>
      <h1>Anecdotes Redux App</h1>
      <form onSubmit={handleCreate}>
        <input type="text" name="newanecdote" required/>
        <button className="create">Create</button>
      </form>
      <ul>
        {anecdotes.map((anecdote) => {
          return (
            <>
              <li key={anecdote.id}>
                {anecdote.anecdote}
                <button onClick={() => handleVote(anecdote.id)}>
                  Vote{" "}
                  {anecdotes.find((el) => el.id == anecdote.id).votes ? (
                    `: ${anecdotes.find((el) => el.id == anecdote.id).votes}`
                  ) : (
                    <></>
                  )}
                </button>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default App;
