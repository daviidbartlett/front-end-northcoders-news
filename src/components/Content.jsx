import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import ArticleSideBar from "./ArticleSideBar";
import TopicSideBar from "./TopicSideBar";

class Content extends Component {
  state = {
    articles: [],
    loading: true
  };
  render() {
    const { user, addTopic } = this.props;
    return (
      <div className="main">
        <div className="content">
          {this.state.articles.map((article) => (
            <div key={article.article_id}>
              <ArticleCard
                article={article}
                deleteArticle={this.deleteArticle}
                user={user}
              />
            </div>
          ))}
        </div>
        <div className="sideBar">
          {this.props.topic ? (
            <ArticleSideBar
              path="/:topic"
              user={user}
              topic={this.props.topic}
              updateStateWithNewArticle={this.updateStateWithNewArticle}
            />
          ) : (
            <TopicSideBar path="/" user={user} addTopic={addTopic} />
          )}
        </div>
      </div>
    );
  }
  componentDidMount = () => {
    this.fetchArticles(this.props.topic);
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.topic !== this.props.topic)
      this.fetchArticles(this.props.topic);
  };

  fetchArticles = (topic, query) => {
    api
      .getArticles(topic, query)
      .then((articles) => {
        this.setState((prevState) => ({
          articles: [
            ...articles,
            articles.map((article) => {
              article.voted = 0;
              return article;
            })
          ]
        }));
      })
      .catch((err) => {
        // if (err.response.status === 404)
        //   navigate("/firstArticle", { state: { topic: topic } });
        // else navigate("/error", { state: { errMsg: err.response.data.msg } });
      });
  };
  deleteArticle = (article_id) => {
    api
      .deleteData(article_id)
      .catch((err) =>
        navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
    const newArticles = this.state.articles.filter((article) => {
      return article_id !== article.article_id;
    });
    this.setState({ articles: newArticles });
  };
  updateStateWithNewArticle = (topic) => {
    this.fetchArticles(topic);
  };
}

export default Content;
