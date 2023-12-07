import { useState } from "react";

const StatisticLine = (props) => {
  if (props.text === "Positive rating %") {
    return (
      <>
        <tr>
          <td style={{ padding: "5px" }}>{props.text}</td>
          <td style={{ padding: "5px" }}>{props.value} %</td>
        </tr>
      </>
    );
  } else {
    return (
      <>
        <tr>
          <td style={{ padding: "5px" }}>{props.text}</td>
          <td style={{ padding: "5px" }}>{props.value}</td>
        </tr>
      </>
    );
  }
};

const Statistics = ({ good, bad, neutral, total, average, positive }) => {
  if (good === 0 && bad === 0 && neutral === 0) return <p>No feedback given</p>;
  else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive rating %" value={positive} />
          </tbody>
        </table>
      </div>
    );
  }
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick} style={{margin: '0 3px' }}>{props.text}</button>
    </>
  );
};

const Quote = (props) => {
  return (
    <>
      <p>{props.text}</p>
    </>
  );
};

const Vote = (props) => {
  return (
    <>
      <p>has {props.value} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  // save feedback into its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [selected, setSelected] = useState(0);
  const [quote, setQuote] = useState(anecdotes[selected]);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  console.log(`votes >>> ${votes}`);

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

  const generateQuote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
    setQuote(anecdotes[random]);
  };

  const updateVote = () => {
    // never mutate state on original, make a copy
    const copy = [...votes];
    copy[selected] = votes[selected] + 1;
    setVotes(copy);
  }

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
      <hr />
      <Quote text={quote} />
      <Vote value={votes[selected]} />
      <Button text="Vote" onClick={updateVote}/>
      <Button text="Random Quote" onClick={generateQuote} />
    </div>
  );
};

export default App;
