import React, { Component } from "react";

class ArticleSideBar extends Component {
  state = {
    title: "",
    body: ""
  };
  render() {
    return (
      <>
        <h2>prompt to login</h2>
        <h3>conditionally render add new article form</h3>
      </>
    );
  }
}

export default ArticleSideBar;
