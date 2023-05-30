import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Card from "./Card";

const IndividualUser = () => {
  const [usuario, setUsuario] = useState({});
  const [userFavM, setUserFavM] = useState([]);
  const [userFavTv, setUserFavTv] = useState([]);
  const [userFavlistM, setUserFavlistM] = useState([]);
  const [userFavlistTv, setUserFavlistTv] = useState([]);

  const key = process.env.VITE_KEY;
  const url = process.env.VITE_URL;

  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/fav/${params.id}/movie`).then((res) => {
      setUserFavM(res.data);
    });

    axios.get(`http://localhost:3001/fav/${params.id}/tv`).then((res) => {
      setUserFavTv(res.data);
    });

    axios.get(`http://localhost:3001/user/${params.id}`).then((res) => {
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
  }, [userFavM]);

  useEffect(() => {
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
  }, [userFavTv]);

  if (!usuario.id) {
    return <h1> Loading... </h1>;
  }

  return (
    <div
      style={{
        marginLeft: "15px",
      }}
    >
      <h1>
        <i> Individual User {usuario.id}:</i> {usuario.fullname}
      </h1>

      <div className="FavoritesMovie">
        <h2> Favorites Movies: </h2>
        {userFavlistM[0] ? (
          <div className="Parent">
            <div className="container">
              {userFavlistM.map((data, i) => {
                return (
                  <div classname="cardContainer" key={i}>
                    <Link to={`/movie/${data.id}`}>
                      <Card data={data} category={"movie"} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h3 style={{ marginLeft: "25px" }}>
            Este usuario no tiene películas favoritas.
          </h3>
        )}
      </div>

      <div className="FavoritesSerie">
        <h2> Favorites Series: </h2>
        {userFavlistTv[0] ? (
          <div className="Parent">
            <div className="container">
              {userFavlistTv.map((data, i) => {
                return (
                  <div classname="cardContainer" key={i}>
                    <Link to={`/tv/${data.id}`}>
                      <Card data={data} category={"tv"} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
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
