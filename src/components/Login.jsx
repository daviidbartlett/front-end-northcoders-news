import React, { Component } from "react";
import * as api from "../api";

class Login extends Component {
  state = {
    username: "",
    incorrectUsername: false
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Login:</label>
          <input
            id="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </form>

        <p
          className={
            this.state.incorrectUsername
              ? "trueIncorrectUsername"
              : "falseIncorrectUsername"
          }
        >
          Incorrect Username!
        </p>
      </>
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
        this.setState({ incorrectUsername: false });
      })
      .catch((err) => {
        if (err.response.status === 404)
          this.setState({ incorrectUsername: true });
      });
  };
}

export default Login;
