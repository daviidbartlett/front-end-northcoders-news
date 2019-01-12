import React, { Component } from "react";
import PleaseLogin from "./PleaseLogin";
import * as api from "../api";

class CommentSideBar extends Component {
  state = {
    comment: ""
  };
  render() {
    const { user } = this.props;
    if (!user) return <PleaseLogin />;
    return (
      <>
        <div className="sideBarForm">
          <h2>Welcome back {user.username}</h2>
          <img
            className="avatar"
            src={this.props.user.avatar_url}
            alt={this.props.user.username}
          />
        </div>

        <div className="sideBarForm">
          <h4>Add a comment</h4>
          <form className="sideForm" onSubmit={this.handleSubmit}>
            <h5>Comment:</h5>
            <textarea
              required
              type="text"
              id="comment"
              onChange={this.handleChange}
              value={this.state.comment}
            />

            <button className="button" id="sideButton" type="submit">
              Post new comment
            </button>
          </form>
        </div>
      </>
    );
  }
  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
  handleSubmit = (event) => {
    console.log(this.props);
    event.preventDefault();
    if (this.props.user) {
      this.addComment(this.state.title, this.state.body);
    } else alert("You need to login to use this feature!");
  };
  addComment = () => {
    const {
      article_id,
      user: { user_id }
    } = this.props;
    const { comment } = this.state;
    api.postComment(article_id, comment, user_id).then(() => {
      this.setState({
        comment: ""
      });
      this.props.updateStateWithNewComment(article_id);
    });
  };
}

export default CommentSideBar;
