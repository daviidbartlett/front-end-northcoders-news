import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import * as api from "../api";
import ArticleCard from "./ArticleCard";

class Content extends Component {
  state = {
    articles: []
  };
  render() {
    return (
      <div className="content">
        {this.state.articles.map((article) => (
          <div key={article.article_id}>
            <ArticleCard article={article} />
          </div>
        ))}
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
        if (err.response.status === 404)
          navigate("/firstArticle", { state: { topic: topic } });
        else navigate("/error", { state: { errMsg: err.response.data.msg } });
      });
  };
}

export default Content;
