import React, { useEffect, useState } from "react";
import "./card.css";
import profilepicture from "../../assets/profilepicture.png";

const CardUser = ({ data, user }) => {
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const image = import.meta.env.VITE_IMAGE_LARGE.replace(/["\\]/g, "");

  return (
    <>
      <div className="carsUserContainer">
        <div className="cardUserImageContainer">
          <img
            src="src/assets/cardUserProfile.png"
            alt="Usuario"
            className="cardUserImage"
          />
        </div>
        <div className="cardUserNameContainer">
          <span> {data.id} - </span>
          <p className="cardUserName">{data.name}</p>
        </div>
        {user.id === data.id ? (
          <div className="cradUserLog">
            <h3> Usuario logueado </h3>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CardUser;