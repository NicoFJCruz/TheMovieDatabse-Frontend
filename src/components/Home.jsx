import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import Grid from "../commons/Grid";
import CardPerson from "../commons/Card/CardPerson";

const Home = ({ user, setSearchResult, setSearch, search }) => {
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");

  const [value, setValue] = useState("");
  const [trending, setTrending] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`${url}/search/multi?api_key=${key}&query=${search}`)
      .then((result) => {
        setSearchResult(result.data);
      });

    setValue("");
  };

  useEffect(() => {
    axios.get(`${url}/trending/all/day?api_key=${key}`).then((result) => {
      setTrending(result.data);
    });
  }, []);

  if (!trending.results) {
    return <h1> Loading... </h1>;
  }

  return (
    <>
      <div>
        <h1>
          Bienvenid@ <i>{user.name}</i> a NicoMDB
        </h1>
      </div>
      {/* <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form className="justify-content-center" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => {
                setValue(e.target.value);
                setSearch(e.target.value);
              }}
              value={value}
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Col>
      </Row>
      <Grid data={trending.results}/> */}
      <CardPerson />
    </>
  );
};

export default Home;
