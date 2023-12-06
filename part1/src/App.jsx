import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <>
      <p>
        {props.text} : {props.value}
      </p>
    </>
  );
};

const Statistics = ({ good, bad, neutral, total, average, positive }) => {
  if (good === 0 && bad === 0 && neutral === 0) return <p>No feedback given</p>;
  else {
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <br />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive rating %" value={positive} />
      </div>
    );
  }
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  );
};

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
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <h1>Statistics</h1>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
