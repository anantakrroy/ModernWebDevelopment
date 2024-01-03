const Result = ({ result, showCountryInfo, showWeatherInfo, temperature, wind, icon, altText }) => {
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
          <h2>Weather in {result[0].capital}</h2>
          {showWeatherInfo(result[0].lat, result[0].long)}
          {temperature ? <p>Temperature : {temperature}</p> : null}
          {icon ? <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={altText}/> : null}
          {wind ? <p>Wind speed : {wind}</p> : null}
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


export default Result