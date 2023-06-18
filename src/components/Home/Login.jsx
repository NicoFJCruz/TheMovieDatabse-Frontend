import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./home.css";
import { Form, Button } from "react-bootstrap";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleClick = () => {
    navigate("/signin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((user) => {
        setUser(user.data);
        localStorage.setItem("user", JSON.stringify(user.data));
        navigate("/movie");
        alert("Usuario logueado");
      })
      .catch((error) => {
        alert("No se pudo loguear");
      });
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
              If you don't have an account
              <button onClick={handleClick}> SignIn</button>
            </h3>
          </div>
        </div>

        <Form onSubmit={handleSubmit} className="logForm">
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
              placeholder="Your Password"
              className="formControl"
            />
          </Form.Group>

          <Button type="submit" id="formButton">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
