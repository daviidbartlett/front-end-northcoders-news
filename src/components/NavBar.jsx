import React from "react";
import { Link } from "@reach/router";
import { Menu, MenuList, MenuButton, MenuLink } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import Login from "./Login";
import AuthUser from "./AuthUser";

const NavBar = ({ topics, user, handleLogout, setUser }) => {
  return (
    <div className="navBar">
      <Link className="button" to="/">
        Home
      </Link>
      <Menu>
        <MenuButton className="button">
          Topics <span aria-hidden>▾</span>
        </MenuButton>
        <MenuList>
          {topics.map((topic) => (
            <MenuLink to={topic.slug} key={topic.slug}>
              {topic.slug}
            </MenuLink>
          ))}
        </MenuList>
      </Menu>
      <div className="loginArea">
        <AuthUser user={user} handleLogout={handleLogout}>
          <Login className="loginForm" setUser={setUser} />
        </AuthUser>
      </div>
    </div>
  );
};

export default NavBar;
