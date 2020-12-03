import React, { Component } from "react";
import { connect } from "react-redux";

class NotFound extends Component {
  render() {
    const notFoundUrl = "404-notFound.jpg";
    return (
      <div>
        <img src={`/${notFoundUrl}`} alt="Notfound" />
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(NotFound);
