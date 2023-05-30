import React from "react";

const Card = ({ data, category }) => {
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const image = import.meta.env.VITE_IMAGE.replace(/["\\]/g, "");
  
  return (
    <>
      {category !== "person" ? (
        <div className="card">
          <div className="imageCard">
            <img
              src={`${image}${data.poster_path}?api_key=${key}`}
              alt="Poster"
            />
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="imageCard">
            <img
              src={`${image}${data.profile_path}?api_key=${key}`}
              alt="Profile picture"
            />
          </div>

          <div>
            <p className="textCard">{data.name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
