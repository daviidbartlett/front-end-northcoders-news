import React from "react";
import Delete from "./DeleteButton";
import VoteArticle from "./VoteArticle";

const CommentCard = ({ comment, user, deleteComment, article_id, addVote }) => {
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
      />
      <p>{body}</p>
      <p>{author}</p>
      <p>{created_at}</p>
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
