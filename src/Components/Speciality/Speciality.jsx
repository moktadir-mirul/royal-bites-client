import { animate, inView } from "motion";
import { use, useEffect, useRef } from "react";
import { FaLeaf, FaUserTie, FaMagic, FaTags } from "react-icons/fa";
import { FaVolleyball } from "react-icons/fa6";
import { GiFruitBowl } from "react-icons/gi";
import { LuChefHat } from "react-icons/lu";
import { SiCodefresh } from "react-icons/si";

const Speciality = ({ specialityPromise }) => {

   const hdRef = useRef();  
   const cardRef = useRef();  
     useEffect(() => {
       inView(hdRef.current, () => {
         animate(
           hdRef.current,
           { x: [-400, 0], opacity: [0, 1] },
           { duration: 0.9, easing: "ease-out" }
         );
       });
       inView(cardRef.current, () => {
         animate(
           cardRef.current,
           { x: [400, 0], opacity: [0, 1] },
           { duration: 1, easing: "ease-out" }
         );
       });
     }, [])

  const features = use(specialityPromise);

  const IconMap = { SiCodefresh, LuChefHat, GiFruitBowl, FaVolleyball };
  return (
    <section className="pt-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="w-11/12 mx-auto px-4 text-center">
        <div ref={hdRef}>
          <h2  className="play text-3xl sm:text-4xl font-bold mb-4">
          Why Choose{" "}
          <span className="text-orange-500 dark:text-amber-500">Royal Bites?</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Discover what makes Royal Bites your go-to for mouthwatering meals,
          crafted with love and served with care.
        </p>
        </div>
        <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const IconComponent = IconMap[feature.icon];
            return (
              <div
                key={feature.id}
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="mb-4 flex justify-center">
                  <IconComponent className={`w-16 h-16 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Speciality;
