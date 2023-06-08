import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import SearchNav from "../../commons/SearchNav";
import Grid from "../../commons/Grid";

const Person = ({ setSearchResult, search, setSearch }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [list, setList] = useState([]);
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const image = import.meta.env.VITE_IMAGE.replace(/["\\]/g, "");

  let percentage =
    windowWidth > 1080 ? 5 : windowWidth > 760 ? 3 : windowWidth > 440 ? 2 : 1;

  useEffect(() => {
    axios.get(`${url}/person/popular?api_key=${key}`).then((result) => {
      setList(result.data.results);
    });
  }, []);

  return (
    <>
      <div style={{ marginTop: "15px", marginLeft: "25px" }}>
        <SearchNav
          setSearchResult={setSearchResult}
          setSearch={setSearch}
          search={search}
        />

        <h1> Popular people </h1>

        < Grid data={list} />
      </div>
    </>
  );
};

export default Person;
