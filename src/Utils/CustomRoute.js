import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import Login from "../Components/Login";

function CustomRoute({ component: Component, ...rest }) {
  const redirect = rest.location.pathname;

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
