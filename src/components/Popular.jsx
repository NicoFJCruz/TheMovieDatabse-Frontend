import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Grid from "../commons/Grid";

const MoviePopular = ({ setSearchResult, search, setSearch }) => {
  const [popular, setPopular] = useState([]);
  const [value, setValue] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const key = process.env.VITE_KEY;
  const url = process.env.VITE_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `${url}/search/${params.category}?api_key=${key}&query=${search}`
      )
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
      <div style={{ marginTop: "15px", marginBottom: "15px" }}>
        <form onSubmit={handleSubmit}>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setSearch(e.target.value);
            }}
            placeholder="Search"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <Grid data={popular} />
    </div>
  );
};

export default MoviePopular;
