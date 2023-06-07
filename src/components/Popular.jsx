import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import List from "./List/List";
import SearchNav from "../commons/SearchNav";

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
      <SearchNav
        setSearchResult={setSearchResult}
        setSearch={setSearch}
        search={search}
      />

      {params.category === "person" ? (
        <div>
          <h1> Popular movies</h1>
          <List type={"popular"} data={params.category} />
        </div>
      ) : (
        <>
          <div>
            <h1> Latest movies</h1>
            <List
              type={params.category === "tv" ? "on_the_air" : "upcoming"}
              data={params.category}
            />
          </div>
          <div>
            <h1> Top Rated movies</h1>
            <List type={"top_rated"} data={params.category} />
          </div>
          <div>
            <h1> Popular movies</h1>
            <List type={"popular"} data={params.category} />
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePopular;
