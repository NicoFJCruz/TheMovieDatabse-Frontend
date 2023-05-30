import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user", {
        fullname,
        email,
        password,
      })
      .then((res) => {
        navigate("/login")
        alert("Usuario creado");
      })
      .catch(() => {
        alert("No se pudo crear usuario");
      });
  };

  return (
    <>
    <h1> Bienvenid@ a NicoMDB </h1>
    <h3> Si no tiene una cuenta, cree un nuevo usuario</h3>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input value={fullname} onChange={(e) => setFullname(e.target.value)}></input>
        <br />
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

export default Signin;
