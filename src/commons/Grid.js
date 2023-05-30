import React from "react";
import { useParams } from "react-router";
import Card from "./Card";
import { Link } from "react-router-dom";

const Grid = ({ data }) => {
  data = data.results;
  const params = useParams();

  return (
    <div className="Parent">
      <div className="container">
        {data.map((data, i) => {
          return (
            <div classname="cardContainer" key={i}>
              <Link to={`/${params.category}/${data.id}`}>
                <Card data={data} category={params.category} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
