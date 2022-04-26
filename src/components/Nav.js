import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {

  const Navigate = useNavigate();
  const checkUserId = localStorage.getItem('userId');
  const checkToken = localStorage.getItem('token');
  const logout = () => {
    localStorage.clear();
  }
  const showNav = () => {
    const nav = document.getElementById('movie-nav-links');
    nav.classList.toggle('visible');
  }
  return (
    <div className="movie-nav-background">
      <div className="movie-nav container">
        <h1><Link to="/login">Movie Collection</Link></h1>
        <button className="hamburger" id="hamburger" onClick={showNav}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <nav className="movie-nav-links" id="movie-nav-links">
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
              {/* <li>
              <Link to="/about">About</Link>
            </li> */}
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
        </nav>
      </div>
    </div>
  );
};

export default Nav;
