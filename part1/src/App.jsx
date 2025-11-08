import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodOnClick = () => setGood((prev) => prev + 1);
  const handleNeutralOnClick = () => setNeutral((prev) => prev + 1);
  const handleBadOnClick = () => setBad((prev) => prev + 1);

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
    </div>
  );
};

export default App;
