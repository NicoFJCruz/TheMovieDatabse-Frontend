import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import MoviePopular from "./components/Popular";
import Search from "./components/Search";
import Content from "./components/Content";
import Favorites from "./components/Favorites";
import Home from "./components/Home";
import UsersNMDB from "./components/UsersNMDB";
import IndividualUser from "./commons/IndividualUser";

const App = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const userLog = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLog);
  }, []);
  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/:category/popular"
          element={
            <MoviePopular
              setSearchResult={setSearchResult}
              setSearch={setSearch}
              search={search}
            />
          }
        />
        <Route
          path="/:category/search"
          element={<Search searchResult={searchResult} search={search} />}
        />
        <Route
          path="/:category/favorites"
          element={<Favorites user={user} />}
        />
        <Route
          path="/:category/:id"
          element={
            <Content
              user={user}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path="/users" element={<UsersNMDB user={user} />} />
        <Route path="/user/:id" element={<IndividualUser />} />
        <Route path="*" element={<Home user={user} />} />
      </Routes>
    </>
  );
};

export default App;
