import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Grid from "../commons/Grid";

const Favorites = ({ user }) => {
  const [fav, setFav] = useState([]);
  const [favlist, setFavlist] = useState({ results: [] });
  const params = useParams();

  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = url = import.meta.env.VITE_URL.replace(/["\\]/g, "");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/fav/${user.id}/${params.category}`)
      .then((res) => {
        setFav(res.data);
      });
  }, [params.category]);

  useEffect(() => {
    let arrayPromiseFav = fav.map((data) => {
      return axios
        .get(`${url}/${data.type}/${data.favId}?api_key=${key}`)
        .then((res) => {
          return res.data;
        });
    });

    Promise.all(arrayPromiseFav).then((favoritos) => {
      setFavlist({ results: favoritos });
    });
  }, [fav]);

  if (!favlist.results[0]) {
    return <h1> No tienes favoritos </h1>;
  }

  return (
    <>
      <h1> Favorites </h1>
      <Grid data={favlist} />
    </>
  );
};

export default Favorites;
