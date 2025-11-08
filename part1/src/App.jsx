import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodOnClick = () => setGood((prev) => prev + 1);
  const handleNeutralOnClick = () => setNeutral((prev) => prev + 1);
  const handleBadOnClick = () => setBad((prev) => prev + 1);

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positivePercent =  (good / total) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodOnClick}>good</button>
      <button onClick={handleNeutralOnClick}>neutral</button>
      <button onClick={handleBadOnClick}>bad</button>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positivePercent} %</p>
    </div>
  );
};

export default App;
