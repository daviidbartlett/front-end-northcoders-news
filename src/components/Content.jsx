import React, { Component } from "react";

class Content extends Component {
  state = {
    articles: []
  };
  render() {
    return (
      <div className="content">
        <h2 className="articleCard">articles here</h2>
        <h2 className="articleCard">articles here</h2>
        <h2 className="articleCard">articles here</h2>
        <h2 className="articleCard">articles here</h2>
      </div>
    );
  }
}

export default Content;
