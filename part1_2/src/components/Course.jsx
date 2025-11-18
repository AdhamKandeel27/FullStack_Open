import React from "react";
import Header from "./Header";
import Content from "./Content";

function Course({ course }) {
  console.log(course);
  return (
    <section className="container">
      <Header course={course} />
      <Content parts={course.parts} />
    </section>
  );
}

export default Course;
