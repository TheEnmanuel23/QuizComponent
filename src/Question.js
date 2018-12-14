import React from "react";
import { Transition } from "react-transition-group";

const QuestionContext = React.createContext();

const Option = ({ value, index }) => (
  <QuestionContext.Consumer>
    {({ type, onChange }) => (
      <div className="question-option">
        {type === "radio" && (
          <input
            id={index}
            name="option"
            type="radio"
            value={value}
            onChange={onChange}
          />
        )}
        {type === "check" && (
          <input id={index} type="checkbox" value={value} onChange={onChange} />
        )}
        <label htmlFor={index}>{value}</label>
      </div>
    )}
  </QuestionContext.Consumer>
);

const Options = ({ options }) => (
  <div className="question">
    {options.map((option, i) => (
      <Option key={option} index={i} value={option} />
    ))}
  </div>
);

const Question = ({ onChange, title, type, options }) => (
  <Transition in={true} timeout={300} appear={true} unmountOnExit>
    {state => (
      <QuestionContext.Provider value={{ onChange, type }}>
        <div className={`question-container question-container-${state}`}>
          <p className="quiz-title">{title}</p>
          {type !== "text" && (
            <Options options={options} type={type} onChange={onChange} />
          )}
          {type === "text" && <input onChange={onChange} />}
        </div>
      </QuestionContext.Provider>
    )}
  </Transition>
);

export default Question;
