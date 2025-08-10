import React, { Suspense, useEffect, useRef } from "react";
import LoadingAnimation from "../../Components/Loading/LoadingAnimation";
import Banner from "../../Components/Banner/Banner";
import ClientsReview from "../../Components/ClientsReview/ClientsReview";
import Speciality from "../../Components/Speciality/Speciality";
import TopSelling from "../../Components/TopSelling/TopSelling";
import { animate, inView } from "motion";
import Recognition from "../../Components/Recognition/Recognition";

const specialityPromise = fetch("/specialityData.json").then((res) =>
  res.json()
);

const Home = () => {
  const bannerRef = useRef();
  const reviewRef = useRef();

  useEffect(() => {
    inView(bannerRef.current, () => {
      animate(
        bannerRef.current,
        { x: [-400, 0], opacity: [0, 1] },
        { duration: 1.4, easing: "ease-out" }
      );
    });
    inView(reviewRef.current, () => {
      animate(
        reviewRef.current,
        { y: [500, 0], opacity: [0, 1] },
        { duration: 0.9, easing: "ease-out" }
      );
    });
    document.title = "Home | Royal Bites";
  }, []);

  return (
    <div>
      <section ref={bannerRef}>
        <Banner></Banner>
      </section>
      <section>
        <TopSelling></TopSelling>
      </section>
      <section>
        <Suspense fallback={<LoadingAnimation></LoadingAnimation>}>
          <Speciality specialityPromise={specialityPromise}></Speciality>
        </Suspense>
      </section>
      <section>
        <Recognition></Recognition>
      </section>
      <section ref={reviewRef}>
        <ClientsReview></ClientsReview>
      </section>
    </div>
  );
};

export default Home;
