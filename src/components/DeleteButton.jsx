import React, { Component } from "react";

class Delete extends Component {
  render() {
    return <button onClick={this.handleClick}>x</button>;
  }

  handleClick = () => {
    const { article_id, comment_id } = this.props;
    this.props.deleteItem(article_id, comment_id);
  };
}

export default Delete;
