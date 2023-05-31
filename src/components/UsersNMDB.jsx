import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardUser from "../commons/CardUser";

const UsersNMDB = ({ user }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/users`).then((res) => {
      setUserList(res.data);
    });
  }, []);

  return (
    <div style={{ marginTop: "25px"}}>
      <div className="container">
        {userList.map((data, i) => {
          return (
            <div className="cardContainer" key={i}>
              <Link to={`/user/${data.id}`}>
                <CardUser data={data} user={user} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersNMDB;
