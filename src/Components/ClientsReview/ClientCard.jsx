import React, { use } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ClientCard = ({ clientsPromise }) => {
  const clientsReview = use(clientsPromise);

  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };
  return (
    <Slider
      {...settings}
      className="w-11/12 h-auto rounded-xl md:w-[500px] md:h-[500px] md:rounded-full bg-yellow-400"
    >
      {clientsReview.map((client) => (
        <div
          key={client.id}
          className="w-11/12 h-auto p-5 rounded-xl md:w-[500px] md:h-[500px] md:rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
        >
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex justify-center pb-5">
              <img
                className="w-16 h-16 md:w-24 md:h-24 rounded-full ring-2 ring-amber-900"
                src={client.image}
                alt={client.title}
              />
            </div>
            <div>
              <h1 className="text-center pb-7">{client.review}</h1>
            </div>
            <div className="text-center">
              <h1 className="play text-2xl font-bold text-amber-900 dark:text-amber-500">
                {client.title}
              </h1>
              <p className="text-lg font-semibold">{client.profession}</p>
              <p className="text-[20px] font-semibold">{client.location}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ClientCard;
