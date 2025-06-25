import React, { useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ImgOne from "../../Images/slideThreePic.jpg";
import ImgTwo from "../../Images/slide-one-img-c.jpg";
import ImgThree from "../../Images/slideImg-two-c.jpg";
import { animate, inView } from "motion";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const imgRef = useRef();
  const gHdRef = useRef()
  useEffect(() => {
    inView(imgRef.current, () => {
      animate(
        imgRef.current,
        { y: [800, 0], opacity: [0, 1] },
        { duration: 1.4, easing: "ease-out" }
      );
    });
    inView(gHdRef.current, () => {
      animate(
        gHdRef.current,
        { x: [500, 0], opacity: [0, 1] },
        { duration: 0.9, easing: "ease-out" }
      );
    });
    document.title = "Gallery | Royal Bites";
  }, []);
  const lightboxOpener = (idx) => {
    setSlideIndex(idx);
    setOpen(true);
  };
  const images = [
    {
      src: "https://i.ibb.co/yc0gJhXz/bd-Food-One.jpg",
      alt: "Bangladeshi Food",
    },
    {
      src: "https://i.ibb.co/0jKHw332/bd-Food-Three.jpg",
      alt: "Kebab Platter",
    },
    { src: "https://i.ibb.co/ZRdvNc3C/bd-Food-Two.jpg", alt: "Shikh Kebab" },
    { src: "https://i.ibb.co/M56n7cDY/burger.jpg", alt: "Burger" },
    { src: "https://i.ibb.co/TDfqtWD0/fried-Rice.jpg", alt: "Fried Rice" },
    { src: "https://i.ibb.co/8VcVbdB/indian-Food-Four.jpg", alt: "Biriyani" },
    {
      src: "https://i.ibb.co/yc4zs0z6/indian-Food-One.jpg",
      alt: "Indian Thali",
    },
    { src: "https://i.ibb.co/GQxTWDzn/noodles.jpg", alt: "Noodles" },
    {
      src: "https://i.ibb.co/Kkr1S9t/indian-Food-Three.jpg",
      alt: "Indian Curry",
    },
    {
      src: "https://i.ibb.co/j90gQM09/indian-Food-Two.jpg",
      alt: "Indian Chola Bhatura",
    },
    { src: "https://i.ibb.co/r2XrWFZD/kebabOne.jpg", alt: "Steak Platter" },
    { src: "https://i.ibb.co/ds0pNxyt/kebabTwo.jpg", alt: "Shwarma" },
  ];
  const Img = [ImgOne, ImgTwo, ImgThree];
  return (
    <div className="dark:bg-gray-900 bg-[url(./Images/gallery.png)]">
      <h1 ref={gHdRef} className="text-5xl font-bold play text-center pt-5 dark:text-white">
        Food{" "}
        <span className="text-orange-500 dark:text-amber-500">Gallery</span>
      </h1>
      <div className="w-full ">
        <div ref={imgRef} className="w-11/12 py-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
          {images.map((image, index) => {
            return (
              <div key={index}>
                <img
                  className="object-cover"
                  src={image.src}
                  alt=""
                  onClick={() => lightboxOpener(index)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={open}
        index={slideIndex}
        close={() => setOpen(false)}
        slides={images}
      />
    </div>
  );
};

export default Gallery;
