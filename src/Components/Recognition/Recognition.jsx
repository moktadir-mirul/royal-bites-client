import { animate, inView } from "motion";
import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";

const stats = [
  {
    id: 1,
    number: 150,
    color: "text-orange-500 dark:text-orange-400",
    heading: "Food Items",
    para: "You can choose from a wide varity of foods collection from our menu that offers versatile items.",
  },
  {
    id: 2,
    number: 500,
    color: "text-blue-500 dark:text-blue-400",
    heading: "Verified Customer",
    para: "We have more than 500 varified customer that has been satisfied with our service and foods.",
  },
  {
    id: 3,
    number: 2500,
    color: "text-amber-500 dark:text-amber-300",
    heading: "Ontime Deliveries",
    para: "We have conduct more than 2500 plus successful deliveries without failure, an achievement we proudly announce.",
  },
  {
    id: 4,
    number: 100,
    color: "text-rose-500 dark:text-rose-400",
    heading: "Team Members",
    para: "More than 100 efficient employeess are at your service to act accroding to your demand of foods and services.",
  },
];

const Recognition = () => {
       const shdRef = useRef();  
   const scardRef = useRef();  
     useEffect(() => {
       inView(shdRef.current, () => {
         animate(
           shdRef.current,
           { x: [400, 0], opacity: [0, 1] },
           { duration: 0.9, easing: "ease-out" }
         );
       });
       inView(scardRef.current, () => {
         animate(
           scardRef.current,
           { x: [-400, 0], opacity: [0, 1] },
           { duration: 1, easing: "ease-out" }
         );
       });
     }, [])
  return (
    <div className="w-full dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="pt-16 w-11/12 mx-auto text-center">
        <div ref={shdRef}>
          <h2 className="play text-3xl sm:text-4xl font-bold mb-4 play">
            Recognize Us In{" "}
            <span className="text-orange-500 dark:text-amber-500">Numbers</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Statistically, Royal Bites is gaining popularity at a fast pace that
            reflects our dedication and commitment to you.
          </p>
        </div>
        {/* Card Part */}
        <div ref={scardRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 border-l-8 ${
                idx % 2 === 0
                  ? "border-t-8 rounded-t-4xl"
                  : "border-b-8 rounded-b-4xl"
              } border-orange-500 rounded-l-4xl `}
            >
              <div
                className={`mb-4 flex justify-center ${stat.color} text-3xl font-bold inter`}
              >
                <CountUp
                  start={0}
                  end={stat.number}
                  enableScrollSpy={true}
                ></CountUp>
                +
              </div>
              <h3 className="text-xl font-semibold mb-2">{stat.heading}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {stat.para}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recognition;
