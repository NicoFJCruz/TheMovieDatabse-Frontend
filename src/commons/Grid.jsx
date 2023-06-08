import React from "react";
import { useParams } from "react-router";
import Card from "./Card";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Grid = ({ data }) => {
  const params = useParams();
  const image = import.meta.env.VITE_IMAGE.replace(/["\\]/g, "");
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");

  return (
    <Container>
      <Row>
        {data.map((item, i) => {
          return (
            <Col key={i} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/${params.category}/${item.id}`}>
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
  );
};

export default Grid;

/*
<Container>
          <Row>
            {data.map((item, i) => {
              return (
                <Col key={i} xs={12} sm={6} md={4} lg={3}>
                  <Link to={`/${params.category}/${data.id}`}>
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
*/
