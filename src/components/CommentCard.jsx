import React from "react";
import Delete from "./DeleteButton";

const CommentCard = ({ comment, user, deleteComment, article_id }) => {
  const { body, author, created_at, comment_id } = comment;

  return (
    <div className="articleCard">
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
