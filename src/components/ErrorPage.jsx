import React from "react";

const ErrorPage = (props) => {
  return <p>{props.location.state.errMsg}</p>;
};

export default ErrorPage;
