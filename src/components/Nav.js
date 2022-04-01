import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {

  const Navigate = useNavigate();
  const checkUserId = localStorage.getItem('userId');
  const checkToken = localStorage.getItem('token');
  const logout = () => {
    localStorage.clear();
  }
  return (
    <div className="movie-nav-background">
      <div className="movie-nav container">
        <h1><Link to="/login">Movie Collection</Link></h1>
        {/* Manually added the user id for admin by looking at the database. */}
        {checkUserId == "26ab30c6-60c2-464e-93b3-defad76a17e5" ?
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/admindashboard">Dashboard</Link>
            </li>
            <li>
              <Link onClick={logout} to="/login">Logout</Link>
            </li>
          </ul>
          :
          (checkUserId !== null ? <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            {checkToken &&
              <li>
                <Link to="/moviedashboard">Dashboard</Link>
              </li>
            }
            <li>
              <Link onClick={logout} to="/login">Logout</Link>
            </li>
          </ul>
            :
            <ul>
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>)
        }
      </div>
    </div>
  );
};

export default Nav;
