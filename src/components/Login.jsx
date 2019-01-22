import React, { Component } from "react";
import * as api from "../api";

class Login extends Component {
  state = {
    username: "",
    incorrectUsername: false,
    isLoading: false
  };
  render() {
    const { username, incorrectUsername, isLoading } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Login:</label>
          <input
            id="username"
            placeholder="username"
            value={username}
            onChange={this.handleChange}
          />
        </form>

        <p
          className={
            incorrectUsername
              ? "trueIncorrectUsername"
              : "falseIncorrectUsername"
          }
        >
          {isLoading
            ? `Logging in`
            : incorrectUsername
            ? `Incorrect Username`
            : ""}
        </p>
      </>
    );
  }
  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ username: value });
  };
  handleSubmit = (event) => {
    this.setState({ isLoading: true });
    event.preventDefault();
    api
      .checkUsername(this.state.username)
      .then((user) => {
        this.props.setUser(user);
        this.setState({ incorrectUsername: false, isLoading: false });
      })
      .catch((err) => {
        if (err.response.status === 404)
          this.setState({ incorrectUsername: true, isLoading: false });
      });
  };
}

export default Login;
