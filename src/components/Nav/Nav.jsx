//Nav at the top of the screen.
//It conditional renders depending on if the user is logged in or not
import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';
import Hamburger from '../Hamburger/Hamburger';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      
      
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink1" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
          <Hamburger />
          </>
        )}
        <Link to="/home">
        <h2 className="nav-title">Budget Buddy</h2>
      </Link>

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
