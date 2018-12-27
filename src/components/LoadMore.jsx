import React, { Component } from "react";

class LoadMore extends Component {
  render() {
    return <button onClick={this.handleSubmit}>Load more</button>;
  }
  handleSubmit = () => {
    this.props.updateStateWithP();
  };
}

export default LoadMore;
