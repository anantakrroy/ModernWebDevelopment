const Search = ({filterByName}) => {
  return (
    <div>
      Filter by name : <input onChange={filterByName} />
    </div>
  );
};

export default Search;