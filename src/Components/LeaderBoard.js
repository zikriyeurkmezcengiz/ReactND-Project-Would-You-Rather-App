import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Divider from "@material-ui/core/Divider";

function Leaderboard(props) {
  const { users } = props;
  const userList = Object.keys(users).map((key) => users[key]);
  const orderedUserList = userList.sort((user1, user2) => {
    const totalOfUser1 =
      Object.keys(user1.answers).length + user1.questions.length;
    const totalOfUser2 =
      Object.keys(user2.answers).length + user2.questions.length;
    return totalOfUser2 - totalOfUser1;
  });

  return (
    <div>
      <ul className="leader-list">
        {orderedUserList.map((user) => (
          <li key={user.id}>
            <Card className="leader-card">
              <div className="leader-header">
                <img
                  src={user.avatarURL}
                  alt={`Avatar of ${user.name}`}
                  className="avatar"
                />
                <span>{user.name}</span>
              </div>
              <Divider className="leader-divider" />
              <div className="leader-counts-header">
                <div className="leader-counts">
                  <HelpOutlineIcon />
                  <span>Asked: {user.questions.length}</span>
                </div>

                <div className="leader-counts">
                  <CheckCircleOutlineIcon />
                  Answered: {Object.keys(user.answers).length}
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
