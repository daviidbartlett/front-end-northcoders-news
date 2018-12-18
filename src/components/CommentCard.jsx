import React from "react";
import Delete from "./DeleteButton";

const CommentCard = ({ comment, user, deleteItem }) => {
  console.log(comment);
  const { body, author, created_at } = comment;
  return (
    <div className="articleCard">
      <p>{body}</p>
      <p>{author}</p>
      <p>{created_at}</p>
      {user && user.username === author && <Delete deleteItem={deleteItem} />}
    </div>
  );
};

export default CommentCard;
