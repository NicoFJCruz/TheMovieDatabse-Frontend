import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:3001/api/users/logout", {}, { withCredentials: true })
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
  /*  */
  return (
    <nav style={{ marginTop: "15px" }}>
      <a href="/">
        {!user.name ? "NicoMDB" : `NicoMDB - ${user.name}`}
      </a>
      <Link to="movie/popular">
        <button style={{ marginLeft: "5px" }}>
          <span> Movies </span>
        </button>
      </Link>

      <Link to="tv/popular">
        <button style={{ marginLeft: "5px" }}>
          <span> Series </span>
        </button>
      </Link>

      <Link to="person/popular">
        <button style={{ marginLeft: "5px" }}>
          <span> Person </span>
        </button>
      </Link>

      {!user.id ? (
        <>
          <Link to="signin">
            <button style={{ marginLeft: "5px" }}>
              <span> SignIn </span>
            </button>
          </Link>
          <Link to="login">
            <button style={{ marginLeft: "5px" }}>
              <span> Login </span>
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/movie/favorites">
            <button style={{ marginLeft: "5px" }}>
              <span> Favorites Movies </span>
            </button>
          </Link>

          <Link to="/tv/favorites">
            <button style={{ marginLeft: "5px" }}>
              <span> Favorites Series </span>
            </button>
          </Link>

          {/* <Link to="/people/favorites">
            <button style={{ marginLeft: "5px" }}>
              <span> Favorites People </span>
            </button>
          </Link> */}

          <Link to="/users">
            <button style={{ marginLeft: "5px" }}>
              <span> NicoMDB Users </span>
            </button>
          </Link>

          <button onClick={handleLogout} style={{ marginLeft: "5px" }}>
            <span> Logout </span>
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
