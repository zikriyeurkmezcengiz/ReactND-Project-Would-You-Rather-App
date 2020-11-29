/* @flow */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../Actions/questions";
import Button from "@material-ui/core/Button";

class Question extends Component {
  handleOptionClicked = function (option) {
    console.log(this.props);
    const { answerQuestion, authedUser, question } = this.props;
    const answer = option === 1 ? "optionOne" : "optionTwo";
    answerQuestion(authedUser, question.id, answer);
  };

  render() {
    const { authedUser, question, users } = this.props;
    const answers = Object.keys(users[authedUser].answers);
    const isAnsweredQuestionByAuthedUser =
      answers.indexOf(question.id) > -1 ? true : false;

    const optionOneVoteCount = question.optionOne.votes.length;
    const optionTwoVoteCount = question.optionTwo.votes.length;

    const totalVotes = optionOneVoteCount + optionTwoVoteCount;

    const percentageForOptionOne =
      (optionOneVoteCount / totalVotes).toFixed(2) * 100;
    const percentageForOptionTwo =
      (optionTwoVoteCount / totalVotes).toFixed(2) * 100;

    return (
      <Link to={`/questions/${question.id}`} className="question">
        <div className="question-header">
          <img
            src={`/${users[question.author].avatarURL}`}
            alt={`Avatar of ${question.author}`}
            className="avatar"
          />
          <span>Would You Rather...</span>
        </div>
        <div className="options">
          <div className="option">
            <Button
              onClick={(event) => this.handleOptionClicked(1)}
              variant="contained"
              color={
                question.optionOne.votes.indexOf(authedUser) > -1
                  ? "primary"
                  : "default"
              }
            >
              {question.optionOne.text}
            </Button>

            {isAnsweredQuestionByAuthedUser && (
              <span className="stats">
                Votes: {optionOneVoteCount} ({percentageForOptionOne}
                %)
              </span>
            )}
          </div>
          <div className="option">
            <Button
              onClick={(event) => this.handleOptionClicked(2)}
              variant="contained"
              color={
                question.optionTwo.votes.indexOf(authedUser) > -1
                  ? "primary"
                  : "default"
              }
            >
              {question.optionTwo.text}
            </Button>

            {isAnsweredQuestionByAuthedUser && (
              <span className="stats">
                Votes: {optionTwoVoteCount} ({percentageForOptionTwo}
                %)
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  console.log(actions);
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps, actions)(Question);
