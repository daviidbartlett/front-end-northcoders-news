import React, { Component } from "react";
import * as api from "../api";

class Login extends Component {
  state = {
    username: ""
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Login:</label>
        <input
          id="username"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
      </form>
    );
  }
  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ username: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    api
      .checkUsername(this.state.username)
      .then((user) => {
        this.props.setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default Login;
