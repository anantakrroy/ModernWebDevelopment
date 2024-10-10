import {useSelector, useDispatch} from 'react-redux'
import { toggleImportance } from '../reducers/noteReducer'

const Note = () => {
    const notes = useSelector(state => state)
    console.log(`List of notes >>>> ${JSON.stringify(notes)}`);
    
    const dispatch = useDispatch()

    const handleImportance = (id) => {
        dispatch(toggleImportance(id))
    }

    return (
        <>
            <ul>
                {notes.map(note => <li key={note.id} onClick= {()=> handleImportance(note.id)}>{note.content} {note.important ? <span className='imptxt'>Important</span> : <></>}</li>)}
            </ul>
        </>
    )
}

export default Note