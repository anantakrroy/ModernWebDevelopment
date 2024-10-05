import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state)

  const handleVote = (id) => {
    console.log("vote click...");
    dispatch({
      type: "VOTE",
      payload: { id },
    });
  };

  return (
    <>
      <h1>Anecdotes Redux App</h1>
      <ul>
        {anecdotes.map((anecdote) => {
          return (
            <>
              <li key={anecdote.id}>
                {anecdote.anecdote}
                <button onClick={() => handleVote(anecdote.id)}>
                  Vote{" "}
                  {anecdotes.find((el) => el.id == anecdote.id).votes ? (
                    `: ${
                      anecdotes.find((el) => el.id == anecdote.id).votes
                    }`
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