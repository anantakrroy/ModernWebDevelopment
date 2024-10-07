import { useDispatch,useSelector } from "react-redux"
import { incVotes } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state)

    const handleVote = (id) => {
        dispatch(incVotes(id))
    }

    return (
        <>
            <ul>
                {anecdotes.map(anecdote => {
                    return <li key={anecdote.id}>
                        {anecdote.anecdote} <button onClick={() => handleVote(anecdote.id)}>Votes{anecdote.votes ? `: ${anecdote.votes}` : ''}</button>
                    </li>
                })}
            </ul>
        </>
    )
}

export default AnecdoteList