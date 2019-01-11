import React, { Component } from "react";
import * as api from "../api";
import { navigate, Link } from "@reach/router";
import CommentCard from "./CommentCard";
import CommentSideBar from "./CommentSideBar";
import VoteArticle from "./VoteArticle";
import moment from "moment";

class Article extends Component {
  state = {
    article: {},
    comments: []
  };
  render() {
    const type = "single";
    const { user, article_id } = this.props;
    const {
      body,
      title,
      author,
      votes,
      voted,
      topic,
      created_at
    } = this.state.article;

    return (
      <div className="main">
        <div className="content">
          <div className="articleCard">
            <VoteArticle
              votes={votes}
              voted={voted}
              type={type}
              article_id={article_id}
              addVote={this.addVote}
              user={this.props.user}
            />
            <span className="articleInfo">
              <div className="titleAuthorLine">
                <p>
                  <Link to={`/${topic}`}>{topic}</Link> . Posted by {author}{" "}
                  {moment(created_at, "YYYYMMDD").fromNow()}
                </p>
              </div>
              <div className="articleBody">
                <h4>{title}</h4> <p>{body}</p>
              </div>
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
                  addVote={this.addVote}
                  user={user}
                  article_id={article_id}
                  deleteComment={this.deleteComment}
                />
              </div>
            ))}
        </div>
        <div className="sideBar">
          <CommentSideBar
            className="sideBar"
            user={user}
            article_id={article_id}
            updateStateWithNewComment={this.updateStateWithNewComment}
          />
        </div>
      </div>
    );
  }
  componentDidMount = () => {
    const { article_id } = this.props;
    this.fetchArticle(article_id);
    this.fetchCommentsForArticle(article_id);
  };
  fetchArticle = (article_id) => {
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
  deleteComment = (article_id, comment_id) => {
    api
      .deleteData(article_id, comment_id)
      .catch((err) =>
        navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
    const newComments = this.state.comments.filter((comment) => {
      return comment_id !== comment.comment_id;
    });
    this.setState({ comments: newComments });
  };
  updateStateWithNewComment = (article_id) => {
    this.fetchCommentsForArticle(article_id);
  };
  addVote = (article_id, vote, type, comment_id) => {
    const increment = vote === "upVote" ? 1 : -1;
    if (comment_id) {
      api
        .updateCommentVote(article_id, increment, comment_id)
        .catch((err) =>
          navigate("/error", { state: { errMsg: err.response.data.msg } })
        );
      this.setState(({ comments }) => ({
        comments: comments.map((mapCom) => {
          if (mapCom.comment_id === comment_id) {
            mapCom.votes += increment;
            mapCom.voted = increment;
          }
          return mapCom;
        })
      }));
    } else {
      console.log("article");
      api
        .updateArticleVote(article_id, increment)
        .catch((err) => console.log(err));
      let newVoteArticle = this.state.article;
      newVoteArticle.votes += increment;
      newVoteArticle.voted = increment;
      this.setState({ article: newVoteArticle });
    }
  };
}

export default Article;
