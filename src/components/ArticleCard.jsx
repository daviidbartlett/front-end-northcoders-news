import React from "react";
import { Link } from "@reach/router";
import Delete from "./DeleteButton";
import VoteArticle from "./VoteArticle";
import moment from "moment";

const ArticleCard = ({
  article,
  deleteArticle,
  user,
  addVote,
  renderLoginWarning
}) => {
  const type = "map";
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
      <VoteArticle
        votes={votes}
        voted={voted}
        article_id={article_id}
        user={user}
        addVote={addVote}
        type={type}
        renderLoginWarning={renderLoginWarning}
      />

      <span className="articleInfo">
        <span className="titleAuthorLine">
          <p>
            <Link className="topicLink" to={`/${topic}`}>
              {topic}
            </Link>{" "}
            . Posted by {author} {moment(created_at, "YYYYMMDD").fromNow()}
          </p>

          {user && user.username === author && (
            <Delete deleteArticle={deleteArticle} article_id={article_id} />
          )}
        </span>
        <h4>
          <Link to={`/${topic}/${article_id}`}>{title}</Link>
        </h4>
        <p>{comment_count} comments</p>
      </span>
    </div>
  );
};

export default ArticleCard;
