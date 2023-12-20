import { useState } from "react";

import Person from "./components/Person";
import Form from "./components/Form";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterPersons, setFilterPersons] = useState(persons);

  const isNamePresent = (name) => {
    return persons.find((e) => e.name.toLowerCase() === name.toLowerCase());
  };

  const addEntry = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone,
      id: persons.length + 1
    };
    if (isNamePresent(newName)) {
      alert(`${newName} is already added to the phonebook ! `);
    } else {
      setPersons([...persons, newPerson]);
      setFilterPersons([...persons, newPerson]);
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
  };

  const filterNames = (event) => {
    const filterBy = event.target.value.toLowerCase();
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filterBy)
    );
    setFilterPersons(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filterByName={filterNames} />
      <Form
        name={newName}
        phone={newPhone}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        addPerson={addEntry}
      />
      <h2>Numbers</h2>
      <ul style={{ listStyle: "none" }}>
        {filterPersons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
