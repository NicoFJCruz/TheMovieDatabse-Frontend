import React from "react";
import config from "../config/config";

const Card = ({ data, category }) => {

  return (
    <>
      {category !== "person" ? (
      <div className="card">
        <div className="imageCard">
          <img
            src={`${config.image}${data.poster_path}?api_key=${config.key}`}
            alt="Poster"
          />
        </div>
      </div>
      ) : (
      <div className="card">
        <div className="imageCard">
          <img
            src={`${config.image}${data.profile_path}?api_key=${config.key}`}
            alt="Profile picture"
          />
        </div>

        <div >
        <p className="textCard">
           {data.name}
          </p>
      </div> 
      </div>
      )}
    </>
  );
};

export default Card;
