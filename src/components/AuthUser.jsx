import React from "react";
import Logout from "./Logout";

const AuthUser = ({ user, children, handleLogout }) => {
  if (!user) return children;
  else return <Logout user={user} handleLogout={handleLogout} />;
};

export default AuthUser;
