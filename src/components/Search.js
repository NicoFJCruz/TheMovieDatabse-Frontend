import React from "react";
import { useParams } from "react-router";
import Grid from "../commons/Grid";

const Search = ({ searchResult, search }) => {
  const params = useParams();

  if (!searchResult) {
    return <h1> Loading... </h1>;
  }

  return (
    <div style={{ marginTop: "15px", marginLeft: "25px" }}>
      <h1>
        Search {params.category} "{search}":{" "}
      </h1>
      <Grid data={searchResult} />
    </div>
  );
};

export default Search;
