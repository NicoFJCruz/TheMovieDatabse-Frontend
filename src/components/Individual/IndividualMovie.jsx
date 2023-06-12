import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./individual.css";

const IndividualMovie = ({ user, setFavorites }) => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [fav, setFav] = useState([]);
  const [favlist, setFavlist] = useState([]);

  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const imageLarge = import.meta.env.VITE_IMAGE_LARGE.replace(/["\\]/g, "");
  const imageOriginal = import.meta.env.VITE_IMAGE_ORIGINAL.replace(
    /["\\]/g,
    ""
  );

  useEffect(() => {
    axios.get(`http://localhost:3001/api/favorites/${user.id}`).then((res) => {
      setFav(res.data.filter((item) => item.type === params.category));
    });

    axios.get(`${url}/configuration/languages?api_key=${key}`).then((res) => {
      setLanguages(res.data);
    });
  }, []);

  useEffect(() => {
    fav.map((data) => {
      return axios
        .get(`${url}/${data.type}/${data.favId}?api_key=${key}`)
        .then((res) => {
          let arrayList = favlist;
          arrayList.push(res.data);
          setFavlist(arrayList);
        });
    });
  }, [fav]);

  const handleAddClick = () => {
    axios
      .post(`http://localhost:3001/api/favorites/${user.id}`, {
        favId: `${params.id}`,
        type: `${params.category}`,
      })
      .then((res) => {
        setFavorites(res.data);
      });
  };

  const handleRemoveClick = () => {
    axios.post(`http://localhost:3001/api/favorites/remove/${user.id}`, {
      userId: `${user.id}`,
      favId: `${params.id}`,
    });
  };

  useEffect(() => {
    axios
      .get(`${url}/${params.category}/${params.id}?api_key=${key}`)
      .then((result) => {
        setData(result.data);
      });
  }, []);

  if (!data.id) {
    return <h1> Loading... </h1>;
  }

  return (
    <>
      <div className="individualContainer">
        <div
          className="individualBackgroundImage"
          style={{
            backgroundImage: `url(${imageOriginal}/${data.backdrop_path}?api=${key})`,
          }}
        ></div>

        <div className="opacityLayer"></div>

        <div className="IdividualContent">
          <div className="individualTopContent">
            <div>
              <img
                className="individualImage"
                style={{ display: "block", margin: "auto" }}
                src={`${imageLarge}${data.poster_path}?api_key=${key}`}
                alt="Poster"
              />
            </div>

            <div>
              <h2 style={{ textAlign: "center" }}>
                {params.category === "movie"
                  ? ` ${data.title}`
                  : ` ${data.name}`}
              </h2>
              <h3>{data.tagline}</h3>

              {user.id ? (
                !favlist.find((one) => one.id === Number(params.id)) ? (
                  <button
                    onClick={handleAddClick}
                    style={{ marginLeft: "15px" }}
                  >
                    Add to favorite
                  </button>
                ) : (
                  <button
                    onClick={handleRemoveClick}
                    style={{ marginLeft: "15px" }}
                  >
                    Added
                  </button>
                )
              ) : null}

              <p style={{ marginLeft: "15px" }}>
                <i>
                  <b>Overview: </b>
                </i>
                {data.overview}
              </p>
            </div>
          </div>

          <div className="IndividualBottomContent">
            Hola
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualMovie;
