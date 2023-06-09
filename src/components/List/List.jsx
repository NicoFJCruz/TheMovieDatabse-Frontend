import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import axios from "axios";
import "./List.css";
import "swiper/css";
import "swiper/css/pagination";
import CardMovie from "../../commons/Card/CardMovie";

const List = ({ type, data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [list, setList] = useState([]);

  const key = import.meta.env.VITE_KEY.replace(/["\\]/g, "");
  const url = import.meta.env.VITE_URL.replace(/["\\]/g, "");
  const image = import.meta.env.VITE_IMAGE.replace(/["\\]/g, "");

  let percentage =
  windowWidth > 1280 ? 5 : windowWidth > 1080 ? 4 : windowWidth > 760 ? 3 : windowWidth >= 540 ? 2 : 1;

  useEffect(() => {
    axios.get(`${url}/${data}/${type}?api_key=${key}`).then((result) => {
      setList(result.data.results);
    });
  }, [type, data]);

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
      <Swiper
        slidesPerView={percentage}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {list.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <CardMovie element={item} data={data} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default List;
