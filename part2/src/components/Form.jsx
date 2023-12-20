const Form = ({
  name,
  phone,
  onNameChange,
  onPhoneChange,
  addPerson,
}) => {
  return (
    <form>
      <h3>Add a new entry</h3>
      <div>
        Name : <input value={name} onChange={onNameChange} />
      </div>
      <div>
        Number : <input value={phone} onChange={onPhoneChange} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
