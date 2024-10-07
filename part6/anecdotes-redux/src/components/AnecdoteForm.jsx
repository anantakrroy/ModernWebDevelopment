import {useDispatch, useSelector} from  'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    
    const handleCreate = (e) => {
        e.preventDefault()
        const newAnecdote = e.target.newanecdote.value
        e.target.newanecdote.value = ''
        const id = anecdotes.length + 1
        dispatch(createAnecdote({id: id, anecdote: newAnecdote, votes: 0}))
    }

    return (
        <>
            <form onSubmit={handleCreate}>
                <input name='newanecdote' type='text' required/>
                <button className='createBtn' type='submit'>Create</button>
            </form>
        </>
    )
}

export default AnecdoteForm