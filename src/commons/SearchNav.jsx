import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

const SearchNav = ({ setSearchResult, search, setSearch }) => {
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

  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setSearch(e.target.value);
            }}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default SearchNav;
