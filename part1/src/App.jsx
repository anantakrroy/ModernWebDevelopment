import { useState } from "react";

const App = () => {
  // save feedback into its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

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
    </div>
  )
}

export default App;