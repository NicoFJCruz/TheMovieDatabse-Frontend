import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./home.css";
import { Form, Button } from "react-bootstrap";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const [trending, setTrending] = useState([]);
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const imageOriginal = import.meta.env.VITE_IMAGE_ORIGINAL.replace(
    /["\\]/g,
    ""
  );

  useEffect(() => {
    axios.get(`${url}/movie/top_rated?api_key=${key}`).then((result) => {
      setTrending(result.data);
    });
  }, []);

  if (!trending.results) {
    return <h1> Loading... </h1>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/users",
        {
          name,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/login");
        alert("Usuario creado");
      })
      .catch(() => {
        alert("No se pudo crear usuario");
      });
  };

  const handleClick = () => {
    navigate("/login");
  };

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
        <div className="logTitle">
          <h1> Welcome to the NicoMDB </h1>
          <div>
            <h3>
              If you have an account
              <button onClick={handleClick}> LogIn </button>
            </h3>
          </div>
        </div>

        <Form onSubmit={handleSubmit} className="logForm">
          <Form.Group controlId="formName" className="formGroup">
            <Form.Label className="formLabel">Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="formControl"
            />
          </Form.Group>
          <Form.Group controlId="formLastName" className="formGroup">
            <Form.Label className="formLabel">Lastname:</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Your lastname"
              className="formControl"
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="formGroup">
            <Form.Label className="formLabel">Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="formControl"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="formGroup">
            <Form.Label className="formLabel">Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="formControl"
            />
          </Form.Group>

          <Button type="submit" id="formButton">
            SignIn
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
