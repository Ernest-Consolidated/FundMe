import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

const Header = () => {
  const { logout } = UseAuth();

  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <>
      <header className="header">
        <div className="logo flex space-x-3 items-center justify-center">
          <img className="h-10" src="images/main.png" alt="FundMe" />
          <Link to="/" className="text-2xl font-semibold">
            FundMe
          </Link>
        </div>
        <ul>
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
