import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../Actions/questions";
import Button from "@material-ui/core/Button";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };

  handleChange = function (event, optionIndex) {
    const text = event.target.value;

    this.setState(function (previousState) {
      return optionIndex === 1
        ? { ...previousState, optionOne: text }
        : { ...previousState, optionTwo: text };
    });
  };

  handleSave = function (event) {
    event.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState(function (previousState) {
      return {
        ...previousState,
        toHome: true,
      };
    });
  };
  render() {
    const { optionOne, optionTwo, toHome } = this.state;
    const { authedUser, users } = this.props;

    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h3 className="center">New Question</h3>
        <div className="question">
          <div className="question-header">
            <img
              src={`/${users[authedUser].avatarURL}`}
              alt={`Avatar of ${authedUser}`}
              className="avatar"
            />
            <span>Would You Rather...</span>
          </div>
          <div className="new-options">
            <div className="new-option">
              <span className="hint">Option One</span>
              <textarea
                value={optionOne}
                onChange={(event) => this.handleChange(event, 1)}
              />
            </div>
            <div className="new-option">
              <span className="hint">Option Two</span>
              <textarea
                value={optionTwo}
                onChange={(event) => this.handleChange(event, 2)}
              />
            </div>
            <Button
              onClick={(event) => this.handleSave(event)}
              className="new-question-button"
              variant="contained"
              color="primary"
              disabled={optionOne === "" || optionTwo === ""}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(NewQuestion);
