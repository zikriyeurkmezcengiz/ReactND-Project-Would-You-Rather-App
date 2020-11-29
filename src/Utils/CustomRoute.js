import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

function CustomRoute({ component: Component, ...rest }) {
  const redirect = rest.location.pathname;

  return (
    <Route
      {...rest}
      render={function (props) {
        return rest.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: redirect,
            }}
          />
        );
      }}
    />
  );
}

export default withRouter(CustomRoute);
