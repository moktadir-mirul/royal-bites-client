import React from "react";
import { Link } from "react-router";
import royalImg from "../../Images/royal-bites2.jpeg";

const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={royalImg}
            alt="Royal Bites Restaurant"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-extrabold text-orange-500 mb-4">
            About Royal Bites
          </h2>
          <p className="text-lg mb-6 leading-relaxed">
            At Royal Bites, we’re passionate about serving unforgettable dining
            experiences. Nestled in the heart of the community, our chefs craft
            each dish using the freshest ingredients, vibrant flavors, and a
            touch of creativity. Whether you're here for a cozy dinner or a
            grand celebration, our mission is to delight your taste buds and
            make every meal truly royal.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-orange-500">
                Our Mission
              </h3>
              <p>
                To bring people together over delicious food, warm hospitality,
                and memories that last a lifetime.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-orange-500">
                Our Team
              </h3>
              <p>
                A group of dedicated culinary artists, hospitality experts, and
                friendly faces — all committed to making your visit feel like a
                feast for the senses.
              </p>
            </div>
            {/* Owner */}
            {/* <div>
              <h3 className="text-2xl font-semibold text-orange-500">Owner</h3>
              <p>
                <strong>Mirul Moktadir Khan</strong> – A passionate entrepreneur
                and food enthusiast, dedicated to crafting a top-tier dining
                experience that blends flavor, ambiance, and service seamlessly.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-orange-500">
                Contact Information
              </h3>
              <p>
                📍 Location: Uttara, Dhaka <br />
                📞 Phone:{" "}
                <a
                  href="tel:+8801711140802"
                  className="text-orange-500 hover:underline"
                >
                  +8801711140802
                </a>
                <br />
                ✉️ Email:{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  info@royalbites.com
                </a>
              </p>
            </div> */}
          </div>

          <Link to={"/allFoods"}>
            <button className="mt-8 inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
              Explore Our Menu
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
