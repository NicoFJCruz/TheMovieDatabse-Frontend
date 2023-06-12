import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./individual.css";

const IndividualMovie = ({ user, setFavorites }) => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const imageLarge = import.meta.env.VITE_IMAGE_LARGE.replace(/["\\]/g, "");
  const imageOriginal = import.meta.env.VITE_IMAGE_ORIGINAL.replace(
    /["\\]/g,
    ""
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const current = await axios.get(
          `${url}/${params.category}/${params.id}?api_key=${key}`
        );

        if (user.id && params.category) {
          const favorites = await axios.get(
            `http://localhost:3001/api/favorites/${user.id}`
          );
          const findFavorite = await favorites.data.find(
            (item) => Number(item.favId) === current.data.id
          );

          !findFavorite ? setIsFavorite(false) : setIsFavorite(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    axios.get(`${url}/configuration/languages?api_key=${key}`).then((res) => {
      setLanguages(res.data);
    });
  }, [params.category, user.id, isFavorite]);

  useEffect(() => {
    axios
      .get(`${url}/${params.category}/${params.id}?api_key=${key}`)
      .then((result) => {
        setData(result.data);
      });
  }, []);

  const handleAddClick = () => {
    axios
      .post(`http://localhost:3001/api/favorites/${user.id}`, {
        favId: `${params.id}`,
        type: `${params.category}`,
      })
      .then((res) => {
        setFavorites(res.data);
        setIsFavorite(true);
      });
  };

  const handleRemoveClick = () => {
    axios
      .post(`http://localhost:3001/api/favorites/remove/${user.id}`, {
        userId: `${user.id}`,
        favId: `${params.id}`,
      })
      .then(() => setIsFavorite(false))
  };

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
                src={`${imageLarge}${data.poster_path}?api_key=${key}`}
                alt="Poster"
              />
            </div>

            <div className="individualDetails">
              <h2>
                {params.category === "movie"
                  ? ` ${data.title}`
                  : ` ${data.name}`}
              </h2>
              <h3>{data.tagline}</h3>

              <div className="decorative-line1"></div>

              <div className="IndividualOverview">
                <h4> Overview:</h4>
                <p>{data.overview}</p>
              </div>

              <div className="decorative-line2"></div>
            </div>
          </div>

          <div className="IndividualBottomContent">Hola</div>
        </div>
      </div>
      {user.id ? (
        !isFavorite ? (
          <button onClick={handleAddClick} style={{ marginLeft: "15px" }}>
            Add to favorite
          </button>
        ) : (
          <button onClick={handleRemoveClick} style={{ marginLeft: "15px" }}>
            Added
          </button>
        )
      ) : null}
      <div>hola</div>
    </>
  );
};

export default IndividualMovie;
