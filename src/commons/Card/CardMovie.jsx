import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "./card.css";
import "react-circular-progressbar/dist/styles.css";

const CardMovie = ({ element, data }) => {
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const image = import.meta.env.VITE_IMAGE_LARGE.replace(/["\\]/g, "");

  return (
    <div className="cardMovieBody">
      <Link to={`/${data}/${element.id}`} className="cardMovieLink">
        <div className="cardMovieImageContainer">
          <img
            src={`${image}${element.poster_path}?api_key=${key}`}
            alt={element.title}
            className="cardMovieImage"
          />
        </div>
        <div className="bottomContainer">
          <div>
            <CircularProgressbar
              value={element.vote_average}
              maxValue={10}
              text={`${element.vote_average}`}
              strokeWidth={10}
              className="cardMovieProgressbar"
              styles={buildStyles({
                textColor: "#ffffff",
                pathColor:
                  element.vote_average <= 4
                    ? "#b91c1c"
                    : element.vote_average < 6
                    ? "#f97316"
                    : element.vote_average < 7
                    ? "#fde047"
                    : element.vote_average < 8
                    ? "#a3e635"
                    : "#65a30d",
                trailColor: "#e6e6e6",
                textSize: "34px",
              })}
            />
          </div>
          <h5 className="cardMovieDate">
            Release: &nbsp; 
            {data === "tv" ? element.first_air_date : element.release_date}
          </h5>
        </div>
        <h3 className="cardMovieTitle"> {data === "tv" ? element.original_name : element.title} </h3>
      </Link>
    </div>
  );
};

export default CardMovie;
