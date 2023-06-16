import React from "react";

const CardUser = ({ data, user }) => {
  return (
    <div
      className="card"
      style={{
        padding: "5px",
        height: "250px",
        marginLeft: "15px",
        backgroundColor: "inherit",
        color: "white",
        textDecoration: "none",
      }}
    >
      {user.id === data.id ? <h3> Usuario logueado </h3> : <h3> _</h3>}
      <div>
        <img
          style={{
            width: "150px",
          }}
          src="https://cdn-icons-png.flaticon.com/512/2919/2919600.png"
          alt="Usuario"
        />
      </div>

      <div>
        <p >
          {data.id}: {data.name}
        </p>
      </div>
    </div>
  );
};

export default CardUser;
