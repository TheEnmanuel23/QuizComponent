import React from "react";
import ReactDOM from "react-dom";
import Quiz from "./Quiz";
import "./styles.css";

function App() {
  const data = [
    {
      description: "Pregunta 1",
      type: "radio",
      options: ["option 1", "option 2"],
      answers: ["option 1"]
    },
    {
      description: "Pregunta 2",
      type: "check",
      options: ["option 1", "option 2"],
      answers: ["option 2"]
    },
    {
      description: "Pregunta 3",
      type: "check",
      options: ["option 1", "option 2", "option 3"],
      answers: ["option 1", "option 3"]
    },
    {
      description: "Cuanto es 2 + 3",
      type: "text",
      options: [],
      answers: ["5"]
    }
  ];

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Quiz endTheQuiz={() => console.log("finished!")}>
        {data.map(item => (
          <Quiz.Question
            key={item.description}
            title={item.description}
            type={item.type}
            options={item.options}
            answers={item.answers}
          />
        ))}
      </Quiz>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
