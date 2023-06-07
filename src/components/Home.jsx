import React from "react";
import MovieList from "./MovieList/MovieList";
import MavieList from "./MovieList/MovieList";

const Home = ({ user }) => {
  return (
    <>
      <div>
        <h1>
          Bienvenid@ <i>{user.name}</i> a NicoMDB
        </h1>
        <h4> Es un proyecto fullstack basado en TMDB</h4>
      </div>
      <div>
        <h1> Latest movies</h1>
        < MovieList type={"upcoming"} />
      </div>
      <div>
        <h1> Top Rated movies</h1>
        < MovieList type={"top_rated"}/>
      </div>
      <div>
        <h1> Popular movies</h1>
        < MovieList type={"popular"}/>
      </div>
    </>
  );
};

export default Home;
