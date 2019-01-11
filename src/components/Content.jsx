import React, { Component } from "react";
import { navigate } from "@reach/router";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import ArticleSideBar from "./ArticleSideBar";
import TopicSideBar from "./TopicSideBar";
import FirstArticle from "./FirstArticle";
import LoadMore from "./LoadMore";
import * as util from "../utils";

class Content extends Component {
  state = {
    articles: [],
    newArticle: false,
    query: "",
    limit: "",
    p: 1,
    isAtEndOfArticles: false
  };
  render() {
    const { user, addTopic, topic } = this.props;
    const { query, limit } = this.state;
    if (this.state.newArticle || this.state.articles.length === 0)
      return (
        <FirstArticle
          path="/:topic/firstarticle"
          user={user}
          topic={topic}
          updateStateWithNewArticle={this.updateStateWithNewArticle}
        />
      );

    return (
      <div className="main">
        <div className="content">
          <form className="queryBar" onSubmit={this.handleSubmit}>
            <select value={query} id="query" onChange={this.handleChange}>
              <option value="">date new to old</option>
              <option value="sort_ascending=true">date old to new</option>
              <option value="sort_by=votes">most popular</option>
            </select>
            <button>sort</button>
          </form>
          {this.state.articles.map((article) => (
            <div key={article.article_id}>
              <ArticleCard
                article={article}
                deleteArticle={this.deleteArticle}
                user={user}
                addVote={this.addVote}
              />
            </div>
          ))}
          {(!this.state.isAtEndOfArticles ||
            this.state.articles.length % 10 === 0) && (
            <LoadMore updateStateWithP={this.updateStateWithP} topic={topic} />
          )}
        </div>
        <div className="sideBar">
          <div className="queryBar" />
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
    this.setState({ query: query });
    api
      .getArticles(topic, query)
      .then((fetchedArticles) => {
        this.setState({
          articles: fetchedArticles.map((article) => {
            article.voted = 0;
            return article;
          }),
          newArticle: false,
          p: 1,
          isAtEndOfArticles: false
        });
      })
      .catch((err) => {
        //   if (err.response.status === 404) this.setState({ newArticle: true });
        //   else
        //     navigate("/ErrorPage", { state: { errMsg: err.response.data.msg } });
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
  updateStateWithP = () => {
    this.setState((prevState) => {
      prevState.p++;
    }, this.loadMoreArticles(this.props.topic, this.state.query));
  };
  loadMoreArticles = (topic, query) => {
    api
      .getArticles(topic, query, this.state.p + 1)
      .then((fetchedArticles) => {
        const newArticles = fetchedArticles.reduce((acc, article) => {
          if (!this.state.articles.includes(article.article_id)) {
            article.voted = 0;
            acc.push(article);
          }
          return acc;
        }, []);
        const accumulatedArticles = this.state.articles.concat(newArticles);
        this.setState(
          {
            articles: accumulatedArticles,
            newArticle: false,
            isAtEndOfArticles: fetchedArticles.length >= 10 ? false : true
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
  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value }, console.log(this.state));
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { query } = this.state;
    const { topic } = this.props;
    this.fetchArticles(topic, util.buildQuery(query), 1);
  };
}

export default Content;
