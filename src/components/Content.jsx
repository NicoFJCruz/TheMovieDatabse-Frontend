import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import IndividualMovie from "./Individual/IndividualMovie";
import IndividualPerson from "./Individual/IndividualPerson";

const Content = ({ user, setFavorites }) => {
  const params = useParams();
  console.log(params.category);
  return (
    <>
      {params.category === "movie" || params.category === "tv" ? (
        <IndividualMovie user={user} setFavorites={setFavorites} />
      ) : (
        <IndividualPerson user={user} setFavorites={setFavorites} />
      )}
    </>
  );
};

export default Content;
