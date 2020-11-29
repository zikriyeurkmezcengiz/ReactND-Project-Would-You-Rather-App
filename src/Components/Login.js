import React, { Component } from "react";
import { setAuthedUser, clearAuthedUser } from "../Actions/authedUser";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

class Login extends Component {
  state = {
    userId: -1,
    toHome: false,
  };

  componentDidMount() {
    this.props.dispatch(clearAuthedUser());
  }
  handleSelectionChanged = function (event) {
    const userId = event.target.value;
    this.setState(function (preState) {
      return {
        ...preState,
        userId,
      };
    });
  };

  handleLogin = function (event) {
    const { dispatch } = this.props;

    dispatch(setAuthedUser(this.state.userId));

    this.setState(function (previousState) {
      return {
        ...previousState,
        toHome: true,
      };
    });
  };
  render() {
    const BootstrapInput = withStyles((theme) => ({
      root: {
        "label + &": {
          marginTop: theme.spacing(3),
        },
      },
      input: {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
          borderRadius: 4,
          borderColor: "#80bdff",
          boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
      },
    }))(InputBase);

    const { userId, toHome } = this.state;
    const { users } = this.props;
    const avatar =
      userId === -1 ? "Avatars/defaultUser.png" : users[userId].avatarURL;
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h3 className="center">Login</h3>
        <div className="login">
          <Chip label="Please select a user and press the login button." />

          <div className="user-select">
            <img src={avatar} alt="Avatar" className="user-avatar" />

            <FormControl>
              <NativeSelect
                id="demo-customized-select-native"
                value={userId}
                onChange={(event) => this.handleSelectionChanged(event)}
                input={<BootstrapInput />}
              >
                <option value={-1} disabled>
                  Select user ...
                </option>
                {Object.keys(users).map(function (key) {
                  return (
                    <option value={users[key].id} key={key}>
                      {users[key].id}
                    </option>
                  );
                })}
                {/* <option aria-label="None" value="" /> */}
              </NativeSelect>
            </FormControl>
          </div>
          <Button
            onClick={(event) => this.handleLogin(event)}
            className="login-button"
            variant="contained"
            color="primary"
            disabled={userId === -1}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
