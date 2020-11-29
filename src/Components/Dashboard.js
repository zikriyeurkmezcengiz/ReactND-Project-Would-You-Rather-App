import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { connect } from "react-redux";
import Question from "./Question";

class Dashboard extends Component {
  state = {
    questionType: 2,
  };

  handleFilterClicked = function (event) {
    debugger;
    this.setState(function () {
      return {
        questionType:
          event.target.textContent === "Answered"
            ? 1
            : event.target.textContent === "UnAnswered"
            ? 2
            : 3,
      };
    });
  };

  render() {
    const { questionType } = this.state;
    const { authedUser, questions } = this.props;
    const questionsArray = Object.keys(questions).map((key) => questions[key]);

    const filteredQuestions =
      questionType === 1
        ? questionsArray.filter(
            (question) =>
              question.optionOne.votes.indexOf(authedUser) > -1 ||
              question.optionTwo.votes.indexOf(authedUser) > -1
          )
        : questionType === 2
        ? questionsArray.filter(
            (question) =>
              question.optionOne.votes.indexOf(authedUser) === -1 &&
              question.optionTwo.votes.indexOf(authedUser) === -1
          )
        : questionsArray;

    const orderedQuestions = filteredQuestions.sort(
      (a, b) => b.timestamp - a.timestamp
    );

    return (
      <div className="dashboard">
        <div className="dasboard-button-group">
          <ButtonGroup
            size="large"
            color="primary"
            aria-label="large outlined primary button group"
          >
            <Button
              color={questionType === 1 ? "secondary" : "primary"}
              onClick={(event) => this.handleFilterClicked(event)}
            >
              Answered
            </Button>
            <Button
              color={questionType === 2 ? "secondary" : "primary"}
              onClick={(event) => this.handleFilterClicked(event)}
            >
              UnAnswered
            </Button>
            <Button
              color={questionType === 3 ? "secondary" : "primary"}
              onClick={(event) => this.handleFilterClicked(event)}
            >
              Both Of Them
            </Button>
          </ButtonGroup>
        </div>
        <ul className="question-list">
          {orderedQuestions.map((question) => (
            <li key={question.id}>
              <Question question={question} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Dashboard);
