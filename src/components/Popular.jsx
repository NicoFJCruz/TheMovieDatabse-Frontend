import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Grid from "../commons/Grid";
import MovieList from "./MovieList/MovieList";

const MoviePopular = ({ setSearchResult, search, setSearch }) => {
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [value, setValue] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`${url}/search/${params.category}?api_key=${key}&query=${search}`)
      .then((result) => {
        setSearchResult(result.data);
      });
    navigate(`/${params.category}/search`);
  };

  useEffect(() => {
    axios
      .get(`${url}/${params.category}/popular?api_key=${key}`)
      .then((result) => {
        setPopular(result.data);
      });
  }, [params.category]);

  if (!popular.results) {
    return <h1> Loading... </h1>;
  }

  return (
    <div style={{ marginTop: "15px", marginLeft: "25px" }}>
      <nav class="navbar navbar-light">
        <div class="container-fluid">
          <form class="d-flex" onSubmit={handleSubmit}>
            <input
              class="form-control me-2"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setSearch(e.target.value);
              }}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      <div>
        <h1> Latest movies</h1>
        <MovieList type={params.category === "tv" ? "on_the_air" : "upcoming"} data={params.category} />
      </div>
      <div>
        <h1> Top Rated movies</h1>
        <MovieList type={"top_rated"} data={params.category} />
      </div>
      <div>
        <h1> Popular movies</h1>
        <MovieList type={"popular"} data={params.category} />
      </div>
    </div>
  );
};

export default MoviePopular;
