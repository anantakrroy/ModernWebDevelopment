import "./App.css";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import { incVotes } from "./reducers/anecdoteReducer";
import {useDispatch, useSelector} from 'react-redux';

function App() {
  return (
    <>
      <h1>Anecdotes Redux App</h1>
      <AnecdoteForm />
      <AnecdoteList />
    </>
  );
}

export default App;
