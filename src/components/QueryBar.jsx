import React, { Component } from "react";
import * as util from "../utils";

class QueryBar extends Component {
  state = {
    query: "",
    limit: ""
  };
  render() {
    const { query, limit } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={query} id="query" onChange={this.handleChange}>
          <option value="">date new to old</option>
          <option value="sort_ascending=true">date old to new</option>
          <option value="sort_by=votes">most popular</option>
        </select>
        <select value={limit} id="limit" onChange={this.handleChange}>
          <option value="">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <button>sort</button>
      </form>
    );
  }
  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value }, console.log(this.state));
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { query, limit } = this.state;
    const { topic, fetchArticles } = this.props;
    fetchArticles(topic, util.buildQuery(query, limit));
  };
}

export default QueryBar;
