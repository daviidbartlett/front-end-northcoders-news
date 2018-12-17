import React from "react";

const ErrorPage = (props) => {
  console.log(props);
  return <p>{props.location.state.errMsg}</p>;
};

export default ErrorPage;
