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
    const answered = answers.indexOf(question.id) > -1 ? true : false;
    const votesOptionOne = question.optionOne.votes.length;
    const votesOptionTwo = question.optionTwo.votes.length;
    const votesTotal = votesOptionOne + votesOptionTwo;
    const percentVotesOptionOne =
      (votesOptionOne / votesTotal).toFixed(2) * 100;
    const percentVotesOptionTwo =
      (votesOptionTwo / votesTotal).toFixed(2) * 100;
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
            {/* <button
              className={
                question.optionOne.votes.indexOf(authedUser) > -1
                  ? "question-option-selected"
                  : answered
                  ? "answered"
                  : ""
              }
            ></button> */}
            {answered && (
              <span className="stats">
                Votes: {question.optionOne.votes.length} (
                {percentVotesOptionOne}
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

            {answered && (
              <span className="stats">
                Votes: {question.optionTwo.votes.length} (
                {percentVotesOptionTwo}
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
