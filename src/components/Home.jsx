import axios from "axios";
import React, { useState } from "react";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";

const Home = ({ user, setSearchResult }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`${url}/search/${params.category}?api_key=${key}&query=${search}`)
      .then((result) => {
        setSearchResult(result.data);
      });
  };
  return (
    <>
      <div>
        <h1>
          Bienvenid@ <i>{user.name}</i> a NicoMDB
        </h1>
      </div>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form inline className="justify-content-center">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Home;
