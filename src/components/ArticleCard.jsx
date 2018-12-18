import React from "react";
import { Link } from "@reach/router";
import Delete from "./DeleteButton";
// import VoteArticle from "./VoteArticle";

const ArticleCard = ({ article, deleteArticle, user }) => {
  const {
    title,
    article_id,
    author,
    votes,
    comment_count,
    created_at,
    topic,
    voted
  } = article;

  return (
    <div className="articleCard" key={article_id}>
      {/* <VoteArticle
        votes={votes}
        voted={voted}
        article_id={article_id}
        addVote={this.props.addVote}
        user={this.props.user}
      /> */}
      <span className="articleInfo">
        <span className="titleAuthorLine">
          <p>
            <Link to={`/${topic}`}>{topic}</Link>
          </p>
          <p>{author}</p>

          {user && user.username === author && (
            <Delete deleteArticle={deleteArticle} article_id={article_id} />
          )}
        </span>
        <h4>
          <Link to={`/${topic}/${article_id}`}>{title}</Link>
        </h4>
        <p>{comment_count}</p>
        <p>{created_at}</p>
      </span>
    </div>
  );
};

export default ArticleCard;
