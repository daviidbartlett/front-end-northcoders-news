import React from "react";
import ArticleSideBar from "./ArticleSideBar";

const FirstArticle = ({ user, topic, updateStateWithNewArticle }) => {
  return (
    <div className="main">
      <div className="content">
        <div className="articleCard">
          <div className="newArticleMessage">
            <p>Hello there! It feels pretty empty here.</p>
            <p>Why not post an article and start a discussion?</p>
          </div>
        </div>
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
