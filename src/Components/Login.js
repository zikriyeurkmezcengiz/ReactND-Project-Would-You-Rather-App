import React, { Component } from "react";
import { clearAuthedUser } from "../Actions/authedUser";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Login extends Component {
  componentDidMount() {
    this.props.dispatch(clearAuthedUser());
  }
  render() {
    return <div>LoginJS</div>;
  }
}
function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
