const Person = ({ person, deletePerson }) => {
  return (
    <li>
      <span style={{ padding: "15px" }}>{person.name} </span>
      <span> {person.number} </span>
      <button id={person.id} onClick={deletePerson}>Delete</button>
    </li>
  );
};

export default Person;