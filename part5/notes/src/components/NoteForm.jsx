const NoteForm = ({ onSubmit, handleInputChange, value }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={handleInputChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default NoteForm;
