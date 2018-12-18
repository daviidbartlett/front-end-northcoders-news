import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Content from "./components/Content";
import TopicSideBar from "./components/TopicSideBar";
import ArticleSideBar from "./components/ArticleSideBar";
import CommentSideBar from "./components/CommentSideBar";
import ErrorPage from "./components/ErrorPage";
import { Router, navigate } from "@reach/router";
import * as api from "./api";
import Article from "./components/Article";

class App extends Component {
  state = {
    topics: [],
    user: null
  };
  render() {
    const { user, topics } = this.state;
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
          <Content path="/" user={user} />
          <Content path="/:topic" />
          <Article path="/:topic/:article_id" user={user} />
          <ErrorPage path="/error" />
        </Router>

        <Router id="sideBar">
          <TopicSideBar path="/" />
          <ArticleSideBar path="/:topic" />
          <CommentSideBar path="/:topic/:article_id" />
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
    this.setState({ user: userObj }).catch((err) =>
      navigate("/error", { state: { errMsg: err.response.data.msg } })
    );
  };
  handleLogout = () => {
    this.setState({ user: null });
  };
}

export default App;
