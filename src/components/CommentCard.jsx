import React from "react";
import Delete from "./DeleteButton";
import VoteArticle from "./VoteArticle";
import moment from "moment";

const CommentCard = ({
  comment,
  user,
  deleteComment,
  article_id,
  addVote,
  renderLoginWarning
}) => {
  const { body, author, created_at, comment_id, votes, voted } = comment;

  return (
    <div className="articleCard">
      <VoteArticle
        votes={votes}
        voted={voted}
        article_id={article_id}
        addVote={addVote}
        comment_id={comment_id}
        user={user}
        renderLoginWarning={renderLoginWarning}
      />
      <div className="articleInfo">
        <div className="titleAuthorLine">
          <p>
            Posted by {author} {moment(created_at, "YYYYMMDD").fromNow()}
          </p>
        </div>

        <p className="articleBody">{body}</p>
      </div>
      {user && user.username === author && (
        <Delete
          deleteComment={deleteComment}
          comment_id={comment_id}
          article_id={article_id}
        />
      )}
    </div>
  );
};

export default CommentCard;
