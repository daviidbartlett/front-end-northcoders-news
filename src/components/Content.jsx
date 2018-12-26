import React, { Component } from "react";
import { navigate } from "@reach/router";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import ArticleSideBar from "./ArticleSideBar";
import TopicSideBar from "./TopicSideBar";
import FirstArticle from "./FirstArticle";

class Content extends Component {
  state = {
    articles: [],
    loading: true,
    newArticle: false
  };
  render() {
    const { user, addTopic } = this.props;
    if (this.state.newArticle || this.state.articles.length === 0)
      return (
        <FirstArticle
          path="/:topic/firstarticle"
          user={user}
          topic={this.props.topic}
          updateStateWithNewArticle={this.updateStateWithNewArticle}
        />
      );

    return (
      <div className="main">
        <div className="content">
          {this.state.articles.map((article) => (
            <div key={article.title}>
              <ArticleCard
                article={article}
                deleteArticle={this.deleteArticle}
                user={user}
                addVote={this.addVote}
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
      .then((fetchedArticles) => {
        this.setState(
          {
            articles: fetchedArticles.map((article) => {
              article.voted = 0;
              return article;
            }),
            newArticle: false
          },
          () => console.log(this.state)
        );
      })
      .catch((err) => {
        if (err.response.status === 404) this.setState({ newArticle: true });
        else
          navigate("/ErrorPage", { state: { errMsg: err.response.data.msg } });
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
    console.log(topic);
    this.fetchArticles(topic);
  };
  addVote = (article_id, vote, type) => {
    const increment = vote === "upVote" ? 1 : -1;
    api
      .updateArticleVote(article_id, increment)
      .catch((err) =>
        navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
    if (type === "map") {
      this.setState(({ articles }) => ({
        articles: articles.map((mapArt) => {
          if (mapArt.article_id === article_id) {
            mapArt.votes += increment;
            mapArt.voted = increment;
          }

          return mapArt;
        })
      }));
    } else
      this.setState(({ article }) => ({
        article: {
          ...article,
          votes: article.votes + increment,
          voted: increment
        }
      }));
  };
}

export default Content;
