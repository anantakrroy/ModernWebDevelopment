import { useState, useEffect } from "react";
import axios from "axios";
import phoneService from "./services/phonebook";

import Person from "./components/Person";
import Form from "./components/Form";
import Search from "./components/Search";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification]= useState("");

  const hook = () => {
    phoneService
      .getPersons()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        alert(
          `Error fetching phonebook users : ${error.message} ! Retry later...`
        );
      });
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
      if (
        window.confirm(
          `${newName} is already added to the phonebook ! Replace old number with new number ? `
        )
      ) {
        updatePerson(newPerson);
      }
    } else {
      phoneService.createPerson(newPerson).then((response) => {
        // console.log(response);
        setPersons([...persons, response]);
        setNotification(`Added ${response.name}`);
        setNewName("");
        setNewPhone("");
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
    }
  };

  const updatePerson = (event) => {
    const newPerson = event;
    const personToUpdateId = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    )["id"];
    phoneService.updatePerson(newPerson, personToUpdateId).then((response) => {
      setPersons(persons.map(p => p.id === personToUpdateId ? {name: p.name, number: newPerson.number} : p));
      setNotification(`Updated phone number of ${newPerson.name}`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }).catch(error => {
      alert(`Error updating phonebook entry : ${error.message} !`);
    });
  };

  const deletePerson = (event) => {
    const id = Number(event.target.id);
    const person = persons.filter((person) => person.id === id);
    const name = person[0].name;
    if (window.confirm(`Delete ${name} ?`)) {
      phoneService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`Person with id ${id} is already removed from database !`);
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
      <Notification message={notification} />
      <h2>Numbers</h2>
      <ul style={{ listStyle: "none" }}>
        {persons.map((person) => {
          if (!person.name.toLowerCase().includes(nameFilter)) {
            return null;
          }
          return (
            <Person
              key={person.name}
              person={person}
              deletePerson={deletePerson}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
