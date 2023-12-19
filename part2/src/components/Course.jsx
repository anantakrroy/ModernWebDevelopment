const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => (
  <p>
    <b>
      Total exercises : {parts.reduce((result, c) => result + c.exercises, 0)}
    </b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Course = (props) => {
  const courses = props.course;
  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </>
  );
};

export default Course;
