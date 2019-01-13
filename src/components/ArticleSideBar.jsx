import React, { Component } from "react";
import PleaseLogin from "./PleaseLogin";
import * as api from "../api";

class ArticleSideBar extends Component {
  state = {
    title: "",
    body: ""
  };

  render() {
    const { user, unauthorisedRequest } = this.props;
    if (!user) return <PleaseLogin unauthorisedRequest={unauthorisedRequest} />;
    const {
      firstArticle,
      topic,
      user: { avatar_url, username }
    } = this.props;

    return (
      <>
        <div className="sideBarForm">
          <h2>Welcome back {username}</h2>
          <img className="avatar" src={avatar_url} alt={username} />
        </div>

        <div className="sideBarForm">
          {firstArticle ? (
            <h4>Post your first article in {topic}</h4>
          ) : (
            <h4>Have something to say? Why not add a new article?</h4>
          )}

          <form onSubmit={this.handleSubmit}>
            <h5>Title:</h5>
            <input
              required
              type="text"
              id="title"
              onChange={this.handleChange}
              value={this.state.title}
            />

            <h5> Body:</h5>
            <textarea
              className="longInput"
              required
              type="text"
              id="body"
              onChange={this.handleChange}
              value={this.state.body}
            />

            <button className="button" id="sideButton" type="submit">
              Post new article
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
    event.preventDefault();
    this.addNewArticle(this.state.title, this.state.body);
  };
  addNewArticle = () => {
    api
      .postNewArticle(
        this.props.topic,
        this.state.title,
        this.state.body,
        this.props.user.user_id
      )
      .then((article) => {
        this.props.updateStateWithNewArticle(this.props.topic);
        this.setState({
          title: "",
          body: ""
        });
        return article;
      });
  };
}

export default ArticleSideBar;
