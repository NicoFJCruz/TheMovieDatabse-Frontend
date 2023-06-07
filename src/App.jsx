import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Home from "./components/Home";
import UsersNMDB from "./components/UsersNMDB";
import IndividualUser from "./commons/IndividualUser";
import Navbar2 from "./commons/Navbar";
import CategoryRoutes from "./commons/CategoryRoutes";

const App = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const userLog = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLog);
  }, [])

  return (
    <>
      <Navbar2 user={user} setUser={setUser} />

      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/:category/*"
          element={
            <CategoryRoutes
              setSearchResult={setSearchResult}
              setSearch={setSearch}
              search={search}
              searchResult={searchResult}
              user={user}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path="/users" element={<UsersNMDB user={user} />} />
        <Route path="/user/:id" element={<IndividualUser />} />
        <Route path="/" element={<Home user={user} />} />
        <Route path="*" element={<Home user={user} />} />
      </Routes>
    </>
  );
};

export default App;
