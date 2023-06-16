import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import CardMovie from "../../commons/Card/CardMovie";
import Grid from "../../commons/Grid";

const IndividualUser = () => {
  const [usuario, setUsuario] = useState({});
  const [userFavM, setUserFavM] = useState([]);
  const [userFavTv, setUserFavTv] = useState([]);

  const [userFavlistM, setUserFavlistM] = useState([]);
  const [userFavlistTv, setUserFavlistTv] = useState([]);

  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const favs = await axios.get(
        `http://localhost:3001/api/favorites/${params.id}`
      );
      const favMovie = await favs.data.filter((item) => item.type === "movie");
      favMovie ? setUserFavM(favMovie) : null;

      const favTv = await favs.data.filter((item) => item.type === "tv");
      favMovie ? setUserFavTv(favTv) : null;
    };
    fetchData();

    axios.get(`http://localhost:3001/api/users/${params.id}`).then((res) => {
      setUsuario(res.data);
    });
  }, []);

  useEffect(() => {
    let arrayPromiseM = userFavM.map((data) => {
      return axios
        .get(`${url}/${data.type}/${data.favId}?api_key=${key}`)
        .then((res) => {
          return res.data;
        });
    });

    Promise.all(arrayPromiseM).then((favoritos) => {
      setUserFavlistM(favoritos);
    });

    let arrayPromiseTV = userFavTv.map((data) => {
      return axios
        .get(`${url}/${data.type}/${data.favId}?api_key=${key}`)
        .then((res) => {
          return res.data;
        });
    });

    Promise.all(arrayPromiseTV).then((favoritos) => {
      setUserFavlistTv(favoritos);
    });
  }, [userFavM, userFavTv]);

  if (!usuario.id) {
    return <h1> Loading... </h1>;
  }

  //<Grid data={trending.results} />

  return (
    <div
      style={{
        marginLeft: "15px",
      }}
    >
      <h1>
        <i> Individual User {usuario.id}:</i> {usuario.name}
      </h1>

      <div className="FavoritesMovie">
        <h2> Favorites Movies: </h2>
        {userFavlistM[0] ? (
            <Grid data={userFavlistM} type={"movie"} />
        ) : (
          <h3 style={{ marginLeft: "25px" }}>
            Este usuario no tiene películas favoritas.
          </h3>
        )}
      </div>

      <div className="FavoritesSerie">
        <h2> Favorites Series: </h2>
        {userFavlistTv[0] ? (
          <Grid data={userFavlistTv} type={"tv"} />

        ) : (
          <h3 style={{ marginLeft: "25px" }}>
            Este usuario no tiene series favoritas.
          </h3>
        )}
      </div>
    </div>
  );
};

export default IndividualUser;
