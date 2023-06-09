import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./components/Home/Login";
import Signin from "./components/Home/Signin";
import Home from "./components/Home/Home";
import UsersNMDB from "./components/UsersNMDB";
import Navbar2 from "./commons/Navbar";
import CategoryRoutes from "./CategoryRoutes";
import IndividualUser from "./components/Individual/IndividualUser";
import Footer from "./components/Footer/Footer";

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
        <Route
          path="/"
          element={
            <Home
              user={user}
              setSearchResult={setSearchResult}
              setSearch={setSearch}
              search={search}
              searchResult={searchResult}
            />
          }
        />
        <Route path="*" element={<Home user={user} />} />
      </Routes>

      <Footer/>
    </>
  );
};

export default App;
