import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import axios from "axios";
import "./latest.css";
import "swiper/css";
import "swiper/css/pagination";

const MovieList = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [upcoming, setUpcoming] = useState([]);

  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const image = import.meta.env.VITE_IMAGE.replace(/["\\]/g, "");
  let percentage = windowWidth > 1080 ? 5 : 3;

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
              <div  className="col-10 container">
                <div className="card card-body">
                  <img
                    src={`${image}${item.poster_path}?api_key=${key}`}
                    alt={item.title}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default MovieList;
