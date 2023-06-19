import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CardUser from "../commons/Card/CardUser";

const UsersNMDB = ({ user }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get(`${backend}/api/users`).then((res) => {
      setUserList(res.data);
    });
  }, []);

  return (
    <div style={{ marginTop: "25px" }}>
      <Container>
        <Row>
          {userList.map((data, i) => (
            <Col key={i}>
              <Link to={`/user/${data.id}`} style={{ textDecoration: "none" }}>
                <CardUser data={data} user={user} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default UsersNMDB;
