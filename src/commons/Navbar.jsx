import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:3001/api/users/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        setUser({});
        localStorage.removeItem("user");
        navigate("/login");
        alert("Usuario deslogueado");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          NicoMDB
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/movie"
              >
                Movies
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/tv"
              >
                Series
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/person"
              >
                Person
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!user.id ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/signin">
                    SignIn
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/movie/favorites">
                    Favorites Movies
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/tv/favorites">
                    Favorites Series
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/users">
                    NicoMDB Users
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
