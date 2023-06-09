import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../commons/Card/card.css";

const CardPerson = () => {
  const [list, setList] = useState([]);

  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const image = import.meta.env.VITE_IMAGE_LARGE.replace(/["\\]/g, "");

  useEffect(() => {
    axios.get(`${url}/person/popular?api_key=${key}`).then((result) => {
      setList(result.data.results);
    });
  }, []);

  if (!list[0]) {
    return <h1> Hola </h1>;
  }

  const element = list[4];

  return (
    <div className="cardPersonBody">
      <Link to={`/person/${element.id}`} className="cardMovieLink">
        <div className="cardMovieImageContainer">
          <img
            src={`${image}${element.profile_path}?api_key=${key}`}
            alt={element.title}
            className="cardMovieImage"
          />
        </div>
        <div className="bottomContainer">
          <div>
            <h5 className="cardMovieDate">
              {element.gender === 1 ? "Female" : "Male"}
            </h5>
          </div>
          <h5 className="cardMovieDate">
            Known: {element.known_for_department}
          </h5>
        </div>
        <h3 className="cardMovieTitle">{element.name}</h3>
      </Link>
    </div>
  );
};

export default CardPerson;
