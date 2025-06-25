import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";

const Banner = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full dark:bg-gray-900">
      <Slider {...settings}>
        <div className="rounded-lg">
          <SlideOne></SlideOne>
        </div>
        <div>
          <SlideTwo></SlideTwo>
        </div>
        <div>
          <SlideThree></SlideThree>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
