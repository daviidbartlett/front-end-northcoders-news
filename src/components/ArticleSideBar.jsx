import React, { Component } from "react";
import PleaseLogin from "./PleaseLogin";
import * as api from "../api";

class ArticleSideBar extends Component {
  state = {
    title: "",
    body: ""
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
          <h4>Have something to say? Why not add a new article?</h4>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">title: </label>
            <input
              required
              type="text"
              id="title"
              onChange={this.handleChange}
              value={this.state.title}
            />

            <label htmlFor="body">Body:</label>
            <input
              required
              type="text"
              id="body"
              onChange={this.handleChange}
              value={this.state.body}
            />

            <button type="submit">Post new article</button>
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
    console.log(this.props);
    if (this.props.user) {
      this.addNewArticle(this.state.title, this.state.body);
    } else alert("You need to login to use this feature!");
  };
  addNewArticle = () => {
    api
      .postNewArticle(
        this.props.topic,
        this.state.title,
        this.state.body,
        this.props.user.user_id
      )
      .then(() => {
        this.props.updateStateWithNewArticle(this.props.topic);
        this.setState({
          title: "",
          body: ""
        });
      });
  };
}

export default ArticleSideBar;
