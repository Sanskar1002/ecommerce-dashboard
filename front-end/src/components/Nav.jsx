import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Nav() {
  const user = localStorage.getItem("user");
  const username = JSON.parse(user);
  // console.log(user);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/signup");
  };
  return (
    <div className="nav">
      <img src={logo} className="logo" alt="logo" />
      {user ? (
        <ul className="nav-ul">
          <div className="left-nav">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Products</Link>
            </li>
            <li>
              <Link to="/update">Update Products</Link>
            </li>
          </div>
          <div className="right-nav">
            <li>
              <Link onClick={logout} to="/signup">
                {`Logout ${username.name}`}
              </Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </div>
        </ul>
      ) : (
        <ul className="nav-ul-right">
          <div className="right-nav">
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </div>
        </ul>
      )}
    </div>
  );
}

export default Nav;
