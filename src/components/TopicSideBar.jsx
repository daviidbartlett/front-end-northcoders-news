import React, { Component } from "react";

class TopicSideBar extends Component {
  state = {
    topic: ""
  };
  render() {
    return (
      <div className="sideBar">
        <div className="articleCard">
          <h2>welcome message, prompt to log in</h2>
          <h3>conditionally render new topic form</h3>
        </div>
      </div>
    );
  }
}

export default TopicSideBar;
