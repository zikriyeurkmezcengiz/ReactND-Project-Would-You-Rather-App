import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import NotFound from "./NotFound";
import CustomRoute from "../Utils/CustomRoute";

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
                <Switch>
                  <CustomRoute
                    path="/"
                    exact
                    component={Dashboard}
                    isLoggedIn={isLoggedIn}
                  />
                  <CustomRoute
                    path="/leaderboard"
                    exact
                    component={LeaderBoard}
                    isLoggedIn={isLoggedIn}
                  />
                  <CustomRoute
                    path="/add"
                    exact
                    component={NewQuestion}
                    isLoggedIn={isLoggedIn}
                  />
                  <CustomRoute
                    path="/questions/:id"
                    exact
                    component={QuestionPage}
                    isLoggedIn={isLoggedIn}
                  />
                  <Route path="/login" exact component={Login} />
                  <Route component={NotFound} />{" "}
                </Switch>
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
