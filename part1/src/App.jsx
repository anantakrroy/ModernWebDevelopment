import { useState } from "react";

const App = () => {
  // save feedback into its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const updateGood = good + 1;
    const updateTotal = total + 1;
    const updatePositive = Number((updateGood / updateTotal) * 100).toFixed(2);
    const updateAverage = (updateGood - bad) / updateTotal;
    setAverage(updateAverage);
    setGood(updateGood);
    setTotal(updateTotal);
    setPositive(updatePositive);
  };
  const handleNeutral = () => {
    const updateNeutral = neutral + 1;
    const updateTotal = total + 1;
    const updateAverage = (good - bad) / updateTotal;
    const updatePositive = Number((good / updateTotal) * 100).toFixed(2);
    setAverage(updateAverage);
    setNeutral(updateNeutral);
    setTotal(updateTotal);
    setPositive(updatePositive);
  };
  const handleBad = () => {
    const updateBad = bad + 1;
    const updateTotal = total + 1;
    const updateAverage = (good - updateBad) / updateTotal;
    const updatePositive = Number((good / updateTotal) * 100).toFixed(2);
    setAverage(updateAverage);
    setBad(updateBad);
    setTotal(updateTotal);
    setPositive(updatePositive);
  };

  return (
    <div>
      <h1>Feedback</h1>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <h1>Statistics</h1>
      <p>good : {good}</p>
      <p>neutral : {neutral}</p>
      <p>bad : {bad}</p>
      <br />
      <p>All : {total}</p>
      <p>Average : {average}</p>
      <p>Postive rating % : {positive}%</p>
    </div>
  );
};

export default App;
