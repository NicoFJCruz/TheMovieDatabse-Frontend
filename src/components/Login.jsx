import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3001/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((user) => {
        setUser(user.data);
        localStorage.setItem("user", JSON.stringify(user.data));
        navigate("/movie/popular");
        alert("Usuario logueado");
      })
      .catch((error) => {
        alert("No se pudo loguear");
      });
  };

  return (
    <>
      <h1> Bienvenid@ a NicoMDB </h1>
      <h3> Si ya tiene una cuenta, ingrese sus datos</h3>

      <form onSubmit={handleSubmit}>
        <label>email: </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br />
        <label>password: </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
