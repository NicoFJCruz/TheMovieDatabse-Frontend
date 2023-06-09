import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";

const CardPerson = ({ element }) => {
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
