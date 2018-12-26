import React from "react";
import ArticleSideBar from "./ArticleSideBar";

const FirstArticle = ({ user, topic, updateStateWithNewArticle }) => {
  return (
    <div className="main">
      <div className="content">
        <p>Post your first article</p>
      </div>

      <div className="sideBar">
        <ArticleSideBar
          user={user}
          firstArticle={true}
          topic={topic}
          updateStateWithNewArticle={updateStateWithNewArticle}
        />
      </div>
    </div>
  );
};

export default FirstArticle;
