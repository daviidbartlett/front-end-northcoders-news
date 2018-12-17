import React, { Component } from "react";

class CommentSideBar extends Component {
  state = {
    comment: ""
  };
  render() {
    return (
      <>
        <h2>prompt to login</h2>
        <h3>conditionally render add new comment form</h3>
      </>
    );
  }
}

export default CommentSideBar;
