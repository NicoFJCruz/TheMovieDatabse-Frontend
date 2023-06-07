import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import axios from "axios";
import "./latest.css";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MovieList = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [upcoming, setUpcoming] = useState([]);

  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const image = import.meta.env.VITE_IMAGE.replace(/["\\]/g, "");
  let percentage = windowWidth > 1080 ? 5 : windowWidth > 760 ? 3 : windowWidth > 440 ? 2 : 1;

  useEffect(() => {
    axios.get(`${url}/movie/upcoming?api_key=${key}`).then((result) => {
      setUpcoming(result.data.results);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <>
      <div>
        <h1> Latest movies</h1>
      </div>
      <Swiper
        slidesPerView={percentage}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {upcoming.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <Link to={`movie/${item.id}`}>
                <div className="card-body">
                  <img
                    src={`${image}${item.poster_path}?api_key=${key}`}
                    alt={item.title}
                  />
                  <div className="bottomContainer">
                    <CircularProgressbar
                      value={item.vote_average}
                      maxValue={10}
                      text={`${item.vote_average}`}
                      strokeWidth={10}
                      className="circular"
                      styles={buildStyles({
                        textColor: "#000",
                        pathColor: `#00bfff`,
                        trailColor: "#e6e6e6",
                      })}
                    />
                    <h5> Saber más </h5>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default MovieList;
