import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Content = ({ user, setFavorites }) => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [fav, setFav] = useState([]);
  const [favlist, setFavlist] = useState([]);

  const key = process.env.VITE_KEY;
  const url = process.env.VITE_URL;
  const imageLarge = process.env.VITE_IMAGE_LARGE;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/fav/${user.id}/${params.category}`)
      .then((res) => {
        setFav(res.data);
      });

    axios
      .get(`${url}/configuration/languages?api_key=${key}`)
      .then((res) => {
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
      .post(`http://localhost:3001/fav/${user.id}`, {
        userId: `${user.id}`,
        favId: `${params.id}`,
        type: `${params.category}`,
      })
      .then((res) => {
        setFavorites(res.data);
      });
  };

  const handleRemoveClick = () => {
    axios.post(`http://localhost:3001/fav/${user.id}/remove`, {
      userId: `${user.id}`,
      favId: `${params.id}`,
    });
  };

  useEffect(() => {
    axios
      .get(
        `${url}/${params.category}/${params.id}?api_key=${key}`
      )
      .then((result) => {
        setData(result.data);
      });
  }, []);

  if (!data.id) {
    return <h1> Loading... </h1>;
  }

  return (
    <>
      <header>
        <h2 style={{ textAlign: "center" }}>
          {params.category.toUpperCase()}:
          {params.category === "movie" ? ` ${data.title}` : ` ${data.name}`}
        </h2>
        <div>
          <div>
            {params.category !== "person" ? (
              <img
                style={{ display: "block", margin: "auto" }}
                src={`${imageLarge}${data.poster_path}?api_key=${key}`}
                alt="Poster"
              />
            ) : (
              <img
                style={{ display: "block", margin: "auto" }}
                src={`${imageLarge}${data.profile_path}?api_key=${key}`}
                alt="Person profile picture"
              />
            )}
          </div>

          <div>
            {params.category !== "person" ? (
              <>
                <h3 style={{ textAlign: "center" }}>
                  <i>Original Title: </i>
                  {params.category === "movie"
                    ? `${data.original_title}`
                    : `${data.original_name}`}

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
                </h3>
                <p style={{ marginLeft: "15px" }}>
                  <i>
                    <b>Overview: </b>
                  </i>
                  {data.overview}
                </p>
              </>
            ) : (
              <>
                <h3 style={{ textAlign: "center" }}>Also Known as: </h3>
                <h4 style={{ textAlign: "center" }}>
                  <ul style={{ textAlign: "left", display:"inline-block", marginTop:"0px"}}>
                    {data.also_known_as.map((one, i) => {
                      return <li key={i}> {one} </li>;
                    })}
                  </ul>
                </h4>
                <p style={{ marginLeft: "15px" }}>
                  <i>
                    <b>Biography: </b>
                  </i>
                  {data.biography}
                </p>
              </>
            )}
          </div>
        </div>
      </header>

      {params.category !== "person" ? (
        <ul>
          {params.category === "movie" ? (
            <>
              <li>
                <i>
                  <b>Release: </b>
                </i>
                {data.release_date}
              </li>

              <li>
                <i>
                  <b>Runtime: </b>
                </i>
                {data.runtime} minutes
              </li>
            </>
          ) : (
            <>
              <li>
                <i>
                  <b>First episode: </b>
                </i>
                {data.first_air_date}
              </li>
              <li>
                <i>
                  <b>Seasons: </b>
                </i>
                {data.number_of_seasons}
              </li>
              <li>
                <i>
                  <b>Episodes: </b>
                </i>
                {data.number_of_episodes}
              </li>
            </>
          )}
          <li>
            <i>
              <b>Original Lenguage: </b>
            </i>
            {!languages[0]
              ? `${data.original_language}`
              : `${
                  languages.find(
                    (one) => one.iso_639_1 === data.original_language
                  ).english_name
                }`}
          </li>
          <li>
            <i>
              <b>Production Countries: </b>
            </i>
            <ul>
              {data.production_countries.map((one, i) => {
                return <li key={i}> {one.name} </li>;
              })}
            </ul>
          </li>
          {data.homepage ? (
            <li>
              <i>
                <b>Homepage: </b>
              </i>
              <a href={`${data.homepage}`} target="_blank" rel="noreferrer">
                {data.homepage}
              </a>
            </li>
          ) : null}
        </ul>
      ) : (
        <ul>
          <li>
            <i>
              <b>Birthday: </b>
            </i>
            {data.birthday}
          </li>
          <li>
            <i>
              <b>Place of birth: </b>
            </i>
            {data.place_of_birth}
          </li>
          {data.deathday ? (
            <li>
              <i>
                <b>Deathday: </b>
              </i>
              {data.deathday}
            </li>
          ) : null}
          <li>
            <i>
              <b>Known for: </b>
            </i>
            {data.known_for_department}
          </li>
          {data.homepage ? (
            <li>
              <i>
                <b>Homepage: </b>
              </i>
              <a href={`${data.homepage}`} target="_blank" rel="noreferrer">
                {data.homepage}
              </a>
            </li>
          ) : null}
        </ul>
      )}
    </>
  );
};

export default Content;
