import React, { Component } from "react";
import PleaseLogin from "./PleaseLogin";

class TopicSideBar extends Component {
  state = {
    slug: "",
    description: ""
  };
  render() {
    const { user, unauthorisedRequest } = this.props;
    if (!user) return <PleaseLogin unauthorisedRequest={unauthorisedRequest} />;
    return (
      <>
        <div className="sideBarForm">
          <h2>Welcome back {this.props.user.username}</h2>
          <img
            className="avatar"
            src={this.props.user.avatar_url}
            alt={this.props.user.username}
          />
        </div>

        <div className="sideBarForm">
          <h4>Want to start a new conversation? Why not add a new topic?</h4>
          <form className="sideForm" onSubmit={this.handleSubmit}>
            <h5>Topic:</h5>
            <input
              className="sideFormComponent"
              required
              type="text"
              id="slug"
              onChange={this.handleChange}
              value={this.state.slug}
            />

            <h5>Description:</h5>
            <textarea
              required
              type="text"
              id="description"
              onChange={this.handleChange}
              value={this.state.description}
            />

            <button className="button" id="sideButton" type="submit">
              Post new topic
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
    console.log(this.props);
    if (this.props.user) {
      this.props.addTopic(this.state.slug, this.state.description);
      this.setState({
        slug: "",
        description: ""
      });
    } else alert("You need to login to use this feature!");
  };
}

export default TopicSideBar;
