import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./Cast.css";
import { Link } from "react-router-dom";

const Cast = ({ cast }) => {
  console.log(cast);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const image = import.meta.env.VITE_IMAGE.replace(/["\\]/g, "");

  let percentage =
    windowWidth > 1280
      ? 5
      : windowWidth > 1080
      ? 4
      : windowWidth > 760
      ? 3
      : windowWidth >= 540
      ? 2
      : 1;

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
    <div className="castContainer">
      <Swiper
        slidesPerView={percentage}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="castSwiper"
      >
        {cast.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <Link
                to={`/person/${item.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="sliderContainer">
                  <div className="imageContainer">
                    <img
                      src={
                        item.profile_path
                          ? `${image}/${item.profile_path}?api=${key}`
                          : "/src/assets/profilepicture.png"
                      }
                      alt="Poster Image"
                      className="sliderImage"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </div>
                  <p className="castName"> {item.name} </p>
                  <p className="castCharacter"> {item.character} </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Cast;
