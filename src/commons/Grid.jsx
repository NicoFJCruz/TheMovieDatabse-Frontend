import React from "react";
import { useParams } from "react-router";
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
              <Link to={`/${!params.category ? item.media_type : params.category}/${item.id}`}>
                <div className="card-body">
                  <img
                    src={`${image}${params.category ==="person" ? item.profile_path : item.poster_path}?api_key=${key}`}
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
