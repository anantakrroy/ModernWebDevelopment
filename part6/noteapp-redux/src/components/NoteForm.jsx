import { useDispatch } from 'react-redux';
import { addNote } from '../reducers/noteReducer';

const NoteForm = () => {
  const dispatch = useDispatch()
  const generateId = () => Math.random() * 1000; 

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = generateId()
    const content = e.target.newnote.value
    e.target.newnote.value = ''
    const newNote = {id : id, content: content, important: false}
    dispatch(addNote(newNote))
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="newnote" />
        <button type="submit">New Note</button>
      </form>
    </>
  );
};

export default NoteForm;
