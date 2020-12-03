import React from "react";
import { Route, withRouter } from "react-router-dom";
import Login from "../Components/Login";

function CustomRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={function (props) {
        return rest.isLoggedIn ? <Component {...props} /> : <Login />;
      }}
    />
  );
}

export default withRouter(CustomRoute);
