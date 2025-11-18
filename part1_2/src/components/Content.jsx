import React from "react";
import Part from "./Part";

const Content = (props) => {
  const { parts } = props;
  console.log(parts);

  const TotalExercises = parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);

  return (
    <div>
      {parts.map((part, index) => {
        return <Part key={index} part={part} />;
      })}
      <div className="total">
        <p>
          <strong>Total Exercises = {TotalExercises}</strong>
        </p>
      </div>
    </div>
  );
};

export default Content;
