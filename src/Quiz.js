import React from "react";
import Question from "./Question";
import { CSSTransition } from "react-transition-group";

class Quiz extends React.Component {
  state = {
    currentChildren: React.Node,
    currentIndex: 0,
    isTheLastQuestion: false,
    optionsSelected: [],
    success: false,
    evaluate: false
  };

  static Question = Question;

  componentDidMount = () => {
    const { children } = this.props;
    const currentChildren = React.Children.toArray(children)[0];
    this.setState({ currentChildren });
  };

  next = () => {
    const success = this.evaluateResponses();
    if (!success) {
      return this.setState({ success });
    }

    const { isTheLastQuestion } = this.state;
    if (isTheLastQuestion) {
      this.setState({ success });
      return this.props.endTheQuiz();
    }

    this.goToNextQuestion();
  };

  evaluateResponses = () => {
    this.setState({ evaluate: true });
    const {
      optionsSelected,
      currentChildren: {
        props: { answers }
      }
    } = this.state;

    let success = false;

    // validate that options selected is equal to anwsers length
    if (optionsSelected.length !== answers.length) {
      return (success = false);
    }

    // validate each option selected
    for (let i = 0; i < optionsSelected.length; i++) {
      const option = optionsSelected[i];
      const exist = answers.find(answer => answer === option);
      success = !!exist;
    }

    return success;
  };

  goToNextQuestion = () => {
    const { children } = this.props;
    let { currentIndex } = this.state;
    const arrayChildren = React.Children.toArray(children);

    currentIndex += 1;

    const currentChildren = arrayChildren[currentIndex];
    const isTheLastQuestion = currentIndex >= arrayChildren.length - 1;

    this.setState({
      currentChildren,
      isTheLastQuestion,
      evaluate: false,
      optionsSelected: [],
      currentIndex
    });
  };

  onChange = e => {
    const { value } = e.target;
    const {
      optionsSelected,
      currentChildren: {
        props: { type }
      }
    } = this.state;

    switch (type) {
      case "radio":
        this.setState({ optionsSelected: [value] });
        break;
      case "check":
        const { checked } = e.target;
        if (checked) {
          this.setState({ optionsSelected: [...optionsSelected, value] });
        } else {
          this.setState({
            optionsSelected: optionsSelected.filter(item => item !== value)
          });
        }
        break;
      case "text":
        this.setState({ optionsSelected: [value.trim()] });
        break;
    }
  };

  render() {
    const { children } = this.props;
    const {
      currentChildren,
      isTheLastQuestion,
      success,
      evaluate,
      currentIndex
    } = this.state;

    return (
      <div className="quiz">
        {currentChildren &&
          React.cloneElement(currentChildren, { onChange: this.onChange })}
        <div className="quiz-footer">
          <CSSTransition
            in={!success && evaluate}
            timeout={300}
            classNames="alert-message"
            unmountOnExit
          >
            <p className="incorrect">Respuesta incorrecta</p>
          </CSSTransition>
          <span className="question-counter">{`${currentIndex + 1}/${
            React.Children.toArray(children).length
          }`}</span>
          <button className="quiz-action" onClick={this.next}>
            {isTheLastQuestion ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    );
  }
}

export default Quiz;
