import React from "react";

const Logout = ({ user, handleLogout }) => {
  const { username } = user;
  return (
    <label htmlFor="loginButton">
      Logged in as: {username}
      <button className="button" onClick={handleLogout} id="loginButton">
        Logout
      </button>
    </label>
  );
};

export default Logout;
