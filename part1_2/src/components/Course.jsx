import React from "react";
import Header from "./Header";
import Content from "./Content";

function Course({ course }) {
  console.log(course);
  return (
    <section className="container">
      {course.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
          </div>
        );
      })}
    </section>
  );
}

export default Course;
