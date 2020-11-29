import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import { connect } from "react-redux";
import "../App.css";
import { handleInitialData } from "../Actions/shared";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import QuestionPage from "./QuestionPage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route
                  path="/"
                  exact
                  component={Dashboard}
                  isLoggedIn={isLoggedIn}
                />
                <Route path="/leaderboard" exact component={LeaderBoard} />
                <Route path="/add" exact component={NewQuestion} />
                <Route path="/login" exact component={Login} />
                <Route
                  path="/questions/:id"
                  exact
                  component={QuestionPage}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    isLoggedIn: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);
