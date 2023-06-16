import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CardPerson from "./Card/CardPerson";
import CardMovie from "./Card/CardMovie";

const Grid = ({ data, type }) => {
  const params = useParams();
  const image = import.meta.env.VITE_IMAGE.replace(/["\\]/g, "");
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");

  return (
    <Container>
      <Row>
        {data.map((item, i) => {
          return (
            <Col key={i} xs={12} sm={6} lg={4} xl={3}>
              {params.category === "person" ? (
                <CardPerson element={item} />
              ) : item.media_type === "person" ? (
                <CardPerson element={item} />
              ) : (
                <CardMovie element={item} data={!item.media_type ? type : item.media_type} />
              )}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Grid;
