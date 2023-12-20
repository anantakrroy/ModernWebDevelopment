const Person = ({ person }) => {
  return (
    <li>
      <span style={{ padding: "15px" }}>{person.name} </span>
      <span> {person.number} </span>
    </li>
  );
};

export default Person;