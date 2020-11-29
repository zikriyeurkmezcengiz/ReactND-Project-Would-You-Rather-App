import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

function Nav(props) {
  const { authedUser, users } = props;
  const isLoggedIn = authedUser !== null;
  const avatarImage = isLoggedIn
    ? users[authedUser].avatarURL
    : "defaultUser.png";
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/leaderboard" exact activeClassName="active">
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" exact activeClassName="active">
            New
          </NavLink>
        </li>

        {isLoggedIn ? (
          <li>
            <NavLink to="/login" exact activeClassName="active">
              <div className="nav-user">
                Logout
                <img
                  src={avatarImage}
                  alt={`Avatar of ${authedUser}`}
                  className="nav-avatar"
                />
                {authedUser}
              </div>
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login" exact activeClassName="active">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps, null, null, { pure: false })(Nav);
