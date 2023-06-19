import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./individual.css";

const IndividualPerson = ({ user, setFavorites }) => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const backend = import.meta.env.VITE_BACKEND_URL.replace(/["\\]/g, "");
  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const imageLarge = import.meta.env.VITE_IMAGE_LARGE.replace(/["\\]/g, "");
  const imageOriginal = import.meta.env.VITE_IMAGE_ORIGINAL.replace(
    /["\\]/g,
    ""
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const current = await axios.get(
          `${url}/${params.category}/${params.id}?api_key=${key}`
        );

        if (user.id && params.category) {
          const favorites = await axios.get(
            `${backend}/api/favorites/${user.id}`
          );
          const findFavorite = await favorites.data.find(
            (item) => Number(item.favId) === current.data.id
          );

          !findFavorite ? setIsFavorite(false) : setIsFavorite(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [params.category, user.id, isFavorite, isOpen]);

  useEffect(() => {
    axios
      .get(`${url}/${params.category}/${params.id}?api_key=${key}`)
      .then((result) => {
        setData(result.data);
      });
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (!data.id) {
    return <h1> Loading... </h1>;
  }

  return (
    <div>
      <div className="individualContainer">
        <div className="IdividualContent">
          <div className="individualTopContent">
            <div>
              <img
                className="individualImage"
                src={
                  data.profile_path
                    ? `${imageLarge}${data.profile_path}?api_key=${key}`
                    : "/src/assets/profilepicture.png"
                }
                alt="Poster"
              />
            </div>

            <div className="individualDetails">
              <div>
                <h2>{data.name}</h2>
              </div>

              <div>
                <h3>{data.place_of_birth}</h3>
              </div>

              <div className="decorative-line1"></div>

              {isOpen ? (
                <div className="IndividualOverview">
                  <h4> Biography:</h4>
                  <p>{data.biography}</p>
                  <button className="seeMoreButton" onClick={handleClick}>
                    See less
                  </button>
                </div>
              ) : (
                <div className="IndividualOverview">
                  <h4> Biography:</h4>
                  <p style={{ marginBottom: "10px" }}>
                    {data.biography
                      .slice(0, 450)
                      .split(" ")
                      .slice(0, -1)
                      .join(" ") + "..."}
                  </p>
                  <button className="seeMoreButton" onClick={handleClick}>
                    See more
                  </button>
                </div>
              )}

              <div className="decorative-line2"></div>

              <div className="IndividualStatus">
                <div className="details1">
                  <h4> Birthday:</h4> <p>{data.birthday}</p>
                </div>
                {data.deathday ? (
                  <div className="details1">
                    <h4> Deathday:</h4> <p>{data.deathday}</p>
                  </div>
                ) : null}
              </div>

              <div className="decorative-line2"></div>

              <div className="IndividualStatus">
                <div className="details1">
                  <h4> Gender:</h4>
                  <p> {data.gender === 1 ? "Female" : "Male"}</p>
                </div>
                <div className="details1">
                  <h4> Known for:</h4>
                  <p> {data.known_for_department}</p>
                </div>
              </div>

              {data.also_known_as[0] ? (
                <>
                  <div className="decorative-line2"></div>

                  <div className="IndividualStatus">
                    <div className="cast">
                      <h4> Also known as:</h4>
                      {data.also_known_as.slice(0, 3).map((item, i, array) => {
                        const isLastItem = i === array.length - 1;
                        const puntuation = isLastItem ? "." : ",";
                        return (
                          <p key={i} style={{ marginRight: "7px" }}>
                            {item}
                            {puntuation}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : null}

              <div className="decorative-line2"> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPerson;
