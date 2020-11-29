import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../Actions/questions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };

  handleSave = function (event) {
    event.preventDefault();
    const { dispatch } = this.props;

    const { optionOne, optionTwo } = this.state;
    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState(function (previousState) {
      return {
        ...previousState,
        toHome: true,
      };
    });
  };

  handleChange = function (event, optionIndex) {
    const text = event.target.value;
    this.setState(function (previousState) {
      return optionIndex === 2
        ? { ...previousState, optionTwo: text }
        : { ...previousState, optionOne: text };
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
              <TextField
                value={optionOne}
                id="outlined-basic"
                label="Option One"
                variant="outlined"
                onChange={(event) => this.handleChange(event, 1)}
              />
            </div>
            <div className="new-option">
              <TextField
                value={optionTwo}
                id="outlined-basic"
                label="Option Two"
                variant="outlined"
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
