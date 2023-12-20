import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
    };
    setPersons([...persons, newPerson]);
    setNewName("");
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNewName(newName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name : <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={addName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{listStyle: 'none'}}>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  );
};

export default App;
