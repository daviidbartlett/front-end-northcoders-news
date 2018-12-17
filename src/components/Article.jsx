import React, { Component } from "react";
import * as api from "../api";
import { Router, navigate } from "@reach/router";

class Article extends Component {
  state = {
    article: {},
    comments: []
  };
  render() {
    return (
      <div className="content">
        <h2 className="articleCard">Full article</h2>
        <h3 className="articleCard">comments</h3>
        <h3 className="articleCard">comments</h3>
        <h3 className="articleCard">comments</h3>
      </div>
    );
  }
  componentDidMount = () => {
    this.fetchArticle(this.props.article_id);
    this.fetchCommentsForArticle(this.props.article_id);
  };
  fetchArticle = (article_id) => {
    api
      .getArticle(article_id)
      .then((article) => {
        this.setState({
          article: { ...article, voted: 0 }
        });
      })
      .catch((err) =>
        navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
  };
  fetchCommentsForArticle = (article_id, query) => {
    api
      .getComments(article_id, query)
      .then((comments) => {
        this.setState({
          comments: comments.map((comment) => {
            comment.voted = 0;
            return comment;
          })
        });
      })
      .catch((err) =>
        navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
  };
}

export default Article;
