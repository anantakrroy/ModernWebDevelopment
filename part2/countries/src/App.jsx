import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const apiUrl = "https://studies.cs.helsinki.fi/restcountries";
  const [country, setCountry] = useState(null);
  const [result, setResult] = useState([]);
  const [all, setAll] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/api/all`).then((response) => setAll(response.data));
  }, []);

  // console.log(`All data >>> ${all}`);

  const handleInputChange = async (event) => {
    // console.log("called handleinputchange.....");
    const char = event.target.value.toLowerCase();
    const searchResults = all
      .filter((country) => country.name.common.toLowerCase().includes(char))
      .map((country) => ({
        id: country.ccn3,
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        languages: country.languages,
        flag: country.flags,
      }));
    setResult(searchResults);
  };

  // console.log(`Result >>>> ${JSON.stringify(result)}`);

  const showCountryInfo = (event) => {
    // console.log(`show button clicked ..... ${event.target.id}`);
    const countryId = event.target.id;
    const country = result.filter((country) => country.id === countryId);
    // console.log(`Show country >>>> ${JSON.stringify(country)}`);
    setResult(country);
  };

  const Result = ({ result }) => {
    if (result.length > 10)
      return <p>{"Too many results....enter more characters in search...."}</p>;
    if (result.length === 1)
      return (
        <div>
          <h1>{result[0].name}</h1>
          <p>Capital: {result[0].capital}</p>
          <p>Area: {result[0].area}</p>
          <p style={{ marginBottom: "5px" }}>
            <strong>Languages: </strong>
          </p>
          <ul>
            {Object.values(result[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            alt={result[0].flag.alt}
            src={result[0].flag.svg}
            width={"200px"}
            height={"200px"}
          />
        </div>
      );
    return (
      <>
        <ul>
          {result.map((country) => (
            <li key={country.id}>
              {country.name}
              <button onClick={showCountryInfo} id={country.id}>
                show
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div>
      <label htmlFor="country">Find countries: </label>
      <input
        autoComplete="off"
        id="country"
        type="text"
        name="country"
        onChange={handleInputChange}
      />
      <Result result={result} />
    </div>
  );
}

export default App;
