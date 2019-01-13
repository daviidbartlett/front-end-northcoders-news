import React from "react";

const PleaseLogin = ({ unauthorisedRequest }) => {
  return (
    <div className="sideBarForm">
      <h3>Welcome</h3>
      <h4 className={unauthorisedRequest ? "reminder" : null}>
        Make sure you login to make full use of this app's features.
      </h4>
      <h5>try tickle122</h5>
    </div>
  );
};

export default PleaseLogin;
