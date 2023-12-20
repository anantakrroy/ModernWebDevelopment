import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const isNamePresent = (name) => {
    return persons.find((e) => e.name.toLowerCase() === name.toLowerCase());
  };

  const addEntry = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phone: newPhone
    };
    if (isNamePresent(newName)) {
      alert(`${newName} is already added to the phonebook ! `);
    } else {
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewPhone("");
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNewName(newName);
  };

  const handlePhoneChange = (event) => {
    const phoneNumber = event.target.value;
    setNewPhone(phoneNumber);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name : <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number : <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit" onClick={addEntry}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{ listStyle: "none" }}>
        {persons.map((person) => (
          <li key={person.name}><span style={{"padding": "15px"}}>{person.name} </span><span> {person.phone} </span></li>
        ))}
      </ul>
    </div>
  );
};

export default App;
