import React from "react";

const CardUser = ({ data, user }) => {
  return (
    <div
      className="card"
      style={{
        border: "2px solid aquamarine",
        borderRadius: "5px",
        padding: "5px",
        height: "250px",
        marginLeft: "15px",
      }}
    >
      {user.id === data.id ? <h3> Usuario logueado </h3> : <h3> _</h3>}
      <div className="imageCard">
        <img
          style={{
            width: "150px",
          }}
          src="https://cdn-icons-png.flaticon.com/512/2919/2919600.png"
          alt="Usuario"
        />
      </div>

      <div>
        <p className="textCard">
          {data.id}: {data.name}
        </p>
      </div>
    </div>
  );
};

export default CardUser;
