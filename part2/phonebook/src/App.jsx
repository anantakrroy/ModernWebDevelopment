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
  const [notification, setNotification] = useState({});

  const hook = () => {
    phoneService
      .getPersons()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        setNotification({
          type: "deleteNotif",
          message: `Error getting users : ${error.message}!`,
        });
        setTimeout(() => {
          setNotification({});
        }, 3000);
      });
  };
  useEffect(hook, []);

  // Helper methods
  const isNamePresent = (name) => {
    return persons.find((e) => e.name.toLowerCase() === name.toLowerCase());
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

  // Add a new contact
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
      phoneService
        .createPerson(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNotification({
            type: "createNotif",
            message: `Added ${newPerson.name}`,
          });
          setNewName("");
          setNewPhone("");
          setTimeout(() => {
            setNotification({});
          }, 3000);
        })
        .catch((error) => {
          setNotification({
            type: "deleteNotif",
            message: `Error adding ${newPerson.name} because ${error.message}!`,
          });
          setTimeout(() => {
            setNotification({});
          }, 3000);
        });
    }
  };

  //  Update an existing entry
  const updatePerson = (event) => {
    const newPerson = event;
    const personToUpdateId = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    )["id"];
    phoneService
      .updatePerson(newPerson, personToUpdateId)
      .then((response) => {
        setPersons(
          persons.map((p) =>
            p.id === personToUpdateId
              ? { ...p, name: newPerson.name, number: newPerson.number }
              : p
          )
        );
        setNotification({
          type: "updateNotif",
          message: `Updated ${response.name} phone number`,
        });
        setNewName("");
        setNewPhone("");
        setTimeout(() => {
          setNotification({});
        }, 3000);
      })
      .catch((error) => {
        setNotification({
          type: "deleteNotif",
          message: `Error updating ${newPerson.name} : ${error.message}!`,
        });
        setTimeout(() => {
          setNotification({});
        }, 3000);
      });
  };

  //  Delete an existing entry
  const deletePerson = (event) => {
    const id = event.target.id;
    const person = persons.filter((person) => person.id === id);
    const name = person[0].name;
    if (window.confirm(`Delete ${name} ?`)) {
      phoneService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            type: "deleteNotif",
            message: `Successfully deleted ${name} !`,
          });
          setTimeout(() => {
            setNotification({});
          }, 3000);
        })
        .catch((error) => {
          setNotification({
            type: "deleteNotif",
            message: `Error deleting ${name} because ${error.message} !`,
          });
          setTimeout(() => {
            setNotification({});
          }, 3000);
        });
    }
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
      <Notification notification={notification} />
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
