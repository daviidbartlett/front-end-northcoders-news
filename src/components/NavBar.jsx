import React from "react";
import { Link } from "@reach/router";
import { Menu, MenuList, MenuButton, MenuLink } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import Login from "./Login";
import AuthUser from "./AuthUser";

const NavBar = ({ topics, user, handleLogout, setUser }) => {
  return (
    <div className="navBar">
      <Link className="homeLink" to="/">
        Home
      </Link>
      <Menu>
        <MenuButton>
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

      <AuthUser user={user} handleLogout={handleLogout}>
        <Login setUser={setUser} />
      </AuthUser>
    </div>
  );
};

export default NavBar;
