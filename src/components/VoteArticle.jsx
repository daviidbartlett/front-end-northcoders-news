import React, { Component } from "react";
import Northcoders_Logo from "../images/Northcoders_Logo.png";
import Northcoders_Logo_reverse from "../images/Northcoders_Logo_reverse.png";
class VoteArticle extends Component {
  render() {
    const { votes, voted } = this.props;

    return (
      <span className="votingArea">
        <button className="voteButton" onClick={this.handleVote}>
          <img
            src={Northcoders_Logo}
            alt="upVote"
            className={voted === 1 ? "submittedVote" : "unsubmittedVote"}
          />
        </button>
        <p>{votes}</p>
        <button className="voteButton" onClick={this.handleVote}>
          <img
            src={Northcoders_Logo_reverse}
            alt="downVote"
            className={voted === -1 ? "submittedVote" : "unsubmittedVote"}
          />
        </button>
      </span>
    );
  }
  handleVote = (event) => {
    const { alt } = event.target;

    if (this.props.user !== null) {
      if (this.props.voted === 0) {
        this.props.addVote(
          this.props.article_id,
          alt,
          this.props.type,
          this.props.comment_id
        );
      }
      if (this.props.voted === 1 && alt === "downVote") {
        this.props.addVote(
          this.props.article_id,
          alt,
          this.props.type,
          this.props.comment_id
        );
        this.props.addVote(
          this.props.article_id,
          alt,
          this.props.type,
          this.props.comment_id
        );
      }
      if (this.props.voted === -1 && alt === "upVote") {
        this.props.addVote(
          this.props.article_id,
          alt,
          this.props.type,
          this.props.comment_id
        );
        this.props.addVote(
          this.props.article_id,
          alt,
          this.props.type,
          this.props.comment_id
        );
      }
    } else {
      this.props.renderLoginWarning();
    }
  };
}

export default VoteArticle;
