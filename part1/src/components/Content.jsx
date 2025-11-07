import React from "react";
import Part from "./Part";

const Content = (props) => {
  const { parts } = props;
  console.log(parts);
  return (
    <div>
      {parts.map((part, index) => {
        return <Part key={index} part={part} />;
      })}
    </div>
  );
};

export default Content;
