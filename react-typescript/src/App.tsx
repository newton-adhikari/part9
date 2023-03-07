interface HeaderCont {
  courseName: string
}

interface TotalExercises {
  total: number
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[],
  kind: "special"
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartDescription {
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartArray {
  courseParts: CoursePart[]
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartSpecial;

const Header = (prop: HeaderCont) => {
  return <h1>{prop.courseName}</h1>
}

const Total = (prop: TotalExercises) => {
  return <p>Number of Exercises {prop.total}</p>
}

const Part = (part: CoursePart) => {
  switch(part.kind) {
    case "basic":
      return <div><strong>{part.name} {part.exerciseCount}</strong> <p><i>{part.description}</i></p></div>

    case "group":
      return <div><strong>{part.name} {part.exerciseCount}</strong> <p>{part.groupProjectCount}</p></div>
    
    case "background":
      return <div><strong>{part.name} {part.exerciseCount}</strong> <p>{part.backroundMaterial} <i>{part.description}</i></p></div>
    
    case "special":
      return <div><strong>{part.name} {part.exerciseCount}</strong> <p><i>{part.description}</i> RequiredSkills: {part.requirements[0]}, {part.requirements[1]}</p></div>

    default:
      return <p>error</p>
  }
}

const Content = (prop: CoursePartArray) => {
  return <>{prop.courseParts.map(p => <Part {...p} />)}</>
}

const App = () => {
  const courseName = "Half Stack application development";
 
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
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