import React, { Component } from "react";

class Delete extends Component {
  render() {
    return (
      <button className="button" onClick={this.handleClick}>
        x
      </button>
    );
  }

  handleClick = () => {
    const { article_id, comment_id } = this.props;
    comment_id
      ? this.props.deleteComment(article_id, comment_id)
      : this.props.deleteArticle(article_id);
  };
}

export default Delete;
