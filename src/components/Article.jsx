import React, { Component } from "react";
import * as api from "../api";
import { Router, navigate } from "@reach/router";
import CommentCard from "./CommentCard";

class Article extends Component {
  state = {
    article: {},
    comments: []
  };
  render() {
    const { body, title, author, votes, voted } = this.state.article;
    return (
      <>
        <div className="articleCard">
          {/* <VoteArticle
            votes={votes}
            voted={voted}
            type={type}
            article_id={article_id}
            addVote={this.props.addVote}
            user={this.props.user}
          /> */}
          <span id="articleInfo">
            <span id="titleAuthorLine">
              <h3>{title}</h3>
              <h4>{author}</h4>
            </span>

            <p>{body}</p>
          </span>
        </div>
        {/* <QueryBar
          fetchCommentsForArticle={this.props.fetchCommentsForArticle}
          fetchArticles={this.props.fetchArticles}
          article_id={article_id}
        /> */}

        {this.state.comments.length !== 0 &&
          this.state.comments.map((comment) => (
            <div key={comment.comment_id}>
              <CommentCard
                comment={comment}
                addVote={this.props.addVote}
                user={this.props.user}
                article_id={this.props.article_id}
                deleteItem={this.props.deleteItem}
              />
            </div>
          ))}
      </>
    );
  }
  componentDidMount = () => {
    const { article_id } = this.props;
    this.fetchArticle(article_id);
    this.fetchCommentsForArticle(article_id);
  };
  fetchArticle = (article_id) => {
    console.log(article_id);
    api
      .getArticle(article_id)
      .then((article) => {
        this.setState({
          article: { ...article, voted: 0 }
        });
      })
      .catch(
        console.log
        // navigate("/error", { state: { errMsg: err.response.data.msg } })
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
      .catch(
        console.log
        //navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
  };
}

export default Article;
