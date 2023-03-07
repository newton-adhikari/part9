interface HeaderCont {
  courseName: string
}

interface TotalExercises {
  total: number
}

interface Parts {
  courseParts: {name: string, exerciseCount: number}[];
}

const Header = (prop: HeaderCont) => {
  return <h1>{prop.courseName}</h1>
}

const Total = (prop: TotalExercises) => {
  return <p>Number of Exercises {prop.total}</p>
}

const Content = (prop: Parts) => {
  return <>{prop.courseParts.map(({name, exerciseCount}) => <p key={name}>{name} {exerciseCount}</p>)}</>
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const total: number = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={total} />
    </div>
  );
};

export default App;