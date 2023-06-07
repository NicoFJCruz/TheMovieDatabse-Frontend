import React from "react";
import MovieList from "./List/List";
import MavieList from "./List/List";

const Home = ({ user }) => {
  return (
    <>
      <div>
        <h1>
          Bienvenid@ <i>{user.name}</i> a NicoMDB
        </h1>
        <h4> Es un proyecto fullstack basado en TMDB</h4>
      </div>
    </>
  );
};

export default Home;
