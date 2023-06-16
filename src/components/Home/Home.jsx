import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import Grid from "../../commons/Grid";
import CardPerson from "../../commons/Card/CardPerson";
import "./home.css";

const Home = ({ user, setSearchResult, setSearch, search, searchResult }) => {
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const imageOriginal = import.meta.env.VITE_IMAGE_ORIGINAL.replace(
    /["\\]/g,
    ""
  );

  const [value, setValue] = useState("");
  const [trending, setTrending] = useState([]);
  const [grid, setGrid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return null;
    }

    axios
      .get(`${url}/search/multi?api_key=${key}&query=${search}`)
      .then((result) => {
        setSearchResult(result.data);
        setGrid(true);
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
    <div>
      <div
        className="homeBackgroundImage"
        style={{
          backgroundImage: `url(${imageOriginal}/${trending.results[0].backdrop_path}?api=${key})`,
        }}
      ></div>
      <div className="homeOpacityLayer"></div>

      <div className="homeTopContainer">
        <div className="homeTitle">
          <h1>
            Welcome <i>{user.name} {user.lastName}</i> to the NicoMDB
          </h1>
        </div>
        <Form className="justify-content-center homeForm" onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Search movies, tv series or persons"
            className="mr-sm-2 homeFormControl"
            onChange={(e) => {
              setValue(e.target.value);
              setSearch(e.target.value);
            }}
            value={value}
          />
          <Button variant="outline-primary" type="submit">
            Search
          </Button>
        </Form>
      </div>

      {!grid ? (
        <Grid data={trending.results} />
      ) : (
        <Grid data={searchResult.results} />
      )}
    </div>
  );
};

export default Home;
