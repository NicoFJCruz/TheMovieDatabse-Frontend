import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchNav from "../../commons/SearchNav";

const Person = ({ setSearchResult, search, setSearch }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [list, setList] = useState([]);
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const image = import.meta.env.VITE_IMAGE.replace(/["\\]/g, "");

  let percentage =
    windowWidth > 1080 ? 5 : windowWidth > 760 ? 3 : windowWidth > 440 ? 2 : 1;

  useEffect(() => {
    axios.get(`${url}/person/popular?api_key=${key}`).then((result) => {
      setList(result.data.results);
    });
  }, []);

  return (
    <>
      <div style={{ marginTop: "15px", marginLeft: "25px" }}>
        <SearchNav
          setSearchResult={setSearchResult}
          setSearch={setSearch}
          search={search}
        />

        <h1> Popular people </h1>

        <Container>
          <Row>
            {list.map((item, i) => {
              return (
                <Col key={i} xs={12} sm={6} md={4} lg={3}>
                  <Link to={`/person/${item.id}`}>
                    <div className="card-body">
                      <img
                        src={`${image}${item.profile_path}?api_key=${key}`}
                        alt={item.title}
                      />
                      <div className="bottomContainer">
                        <h5> Saber más </h5>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Person;

/*
 */
