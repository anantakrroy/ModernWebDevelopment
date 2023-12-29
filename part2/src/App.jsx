import { useState, useEffect } from "react";
import axios from "axios";
import phoneService from "./services/phonebook";

import Person from "./components/Person";
import Form from "./components/Form";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const hook = () => {
    phoneService.getPersons().then(response => setPersons(response));
  };
  useEffect(hook, []);

  const isNamePresent = (name) => {
    return persons.find((e) => e.name.toLowerCase() === name.toLowerCase());
  };

  const addEntry = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone,
    };
    if (isNamePresent(newName)) {
      alert(`${newName} is already added to the phonebook ! `);
    } else {
      phoneService.createPerson(newPerson).then(response => {
        console.log(response);
        setPersons([...persons, response]);
        setNewName("");
        setNewPhone("");
      });
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
    setNameFilter(event.target.value.toLowerCase());
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
        {persons.map((person) => {
          if (!person.name.toLowerCase().includes(nameFilter)) {
            return null;
          }
          return <Person key={person.name} person={person} />;
        })}
      </ul>
    </div>
  );
};

export default App;
