import { useState, useEffect } from "react";
import axios from "axios";

import Result from "./components/Result";

function App() {
  const [country, setCountry] = useState(null);
  const [result, setResult] = useState([]);
  const [all, setAll] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [icon, setIcon] = useState("");
  const [wind, setWind] = useState(0);
  const [altText, setAltText] = useState("");
  const apiKey = import.meta.env.VITE_OPW_API_KEY;

  useEffect(() => {
    const apiUrl = "https://studies.cs.helsinki.fi/restcountries";
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
        lat: country.latlng[0],
        long: country.latlng[1],
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

  const showWeatherInfo = (lat, long) => {
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=${apiKey}`;

    axios
      .get(`${apiUrl}`)
      .then((response) => {
        // console.log(`weather api response : ${JSON.stringify(response.data)}`);
        const data = response.data;
        setTemperature(data.current.temp);
        setIcon(data.current.weather[0].icon);
        setWind(data.current.wind_speed);
        setAltText(data.current.weather[0].description);
      })
      .catch((error) => console.log(`Error fetching weather : ${error}`));
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
      <Result
        result={result}
        showCountryInfo={showCountryInfo}
        showWeatherInfo={showWeatherInfo}
        temperature={temperature}
        icon={icon}
        wind={wind}
        altText={altText}
      />
    </div>
  );
}

export default App;
