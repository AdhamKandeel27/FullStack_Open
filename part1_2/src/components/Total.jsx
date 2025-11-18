import React from "react";

const Total = ({ parts }) => {
  let sum = 0;
  for (let i = 0; i < parts.length; i++) {
    sum += parts[i].exercises;
  }

  return (
    <div>
      <p>Number of exercices = {sum}</p>
    </div>
  );
};

export default Total;
