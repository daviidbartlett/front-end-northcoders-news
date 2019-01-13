import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Content from "./components/Content";

import ErrorPage from "./components/ErrorPage";
import { Router, navigate } from "@reach/router";
import * as api from "./api";
import Article from "./components/Article";

class App extends Component {
  state = {
    topics: [],
    user: null,
    unauthorisedRequest: false
  };

  render() {
    const { user, topics, unauthorisedRequest } = this.state;

    return (
      <div className="App">
        <Header />
        <NavBar
          topics={topics}
          user={user}
          setUser={this.setUser}
          handleLogout={this.handleLogout}
        />
        <Router id="content">
          <Content
            path="/"
            user={user}
            addTopic={this.addTopic}
            renderLoginWarning={this.renderLoginWarning}
            unauthorisedRequest={unauthorisedRequest}
          />
          <Content
            path="/:topic"
            user={user}
            renderLoginWarning={this.renderLoginWarning}
            unauthorisedRequest={unauthorisedRequest}
          />
          <Article
            path="/:topic/:article_id"
            user={user}
            renderLoginWarning={this.renderLoginWarning}
            unauthorisedRequest={unauthorisedRequest}
          />

          <ErrorPage path="/error" />
        </Router>

        <Footer />
      </div>
    );
  }
  componentDidMount = () => {
    this.fetchTopics();
  };

  fetchTopics = () => {
    api
      .getTopics()
      .then((topics) => {
        this.setState({ topics });
      })
      .catch((err) =>
        navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
  };
  setUser = (userObj) => {
    this.setState({ user: userObj });
  };
  handleLogout = () => {
    this.setState({ user: null });
  };
  addTopic = (slug, description) => {
    api
      .postTopic(slug, description)

      .then((topic) => {
        this.setState((prevState) => ({
          topics: [...prevState.topics, topic]
        }));
      });
  };
  renderLoginWarning = () => {
    this.setState((prevState) => ({
      unauthorisedRequest: !prevState.unauthorisedRequest
    }));
  };
}
export default App;
