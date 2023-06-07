import React from "react";
import { useParams } from "react-router";
import MoviePopular from "../components/Popular";
import Search from "../components/Search";
import { Route, Routes } from "react-router";
import Favorites from "../components/Favorites";
import Content from "../components/Content";
import Person from "../components/List/Person";

const CategoryRoutes = ({
  setSearchResult,
  setSearch,
  search,
  searchResult,
  user,
  setFavorites,
  favorites,
}) => {
  const { category } = useParams();
  return (
    <Routes>
      <Route
        path="/"
        element={
          category === "movie" || category === "tv" ? (
            <MoviePopular
              setSearchResult={setSearchResult}
              setSearch={setSearch}
              search={search}
            />
          ) : (
            <Person
              setSearchResult={setSearchResult}
              setSearch={setSearch}
              search={search}
            />
          )
        }
      />
      <Route
        path="/search"
        element={<Search searchResult={searchResult} search={search} />}
      />
      <Route path={`/favorites`} element={<Favorites user={user} />} />
      <Route
        path="/:id"
        element={
          <Content
            user={user}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        }
      />
    </Routes>
  );
};

export default CategoryRoutes;
