/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";

// Icon
import { FaBarsProgress } from "react-icons/fa6";

// Components
import HoverImage from "../Components/HoverImage";

// Assets
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";

const Home = ({ handleSidebar, sidebar }) => {
  // Fisrt render on top page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Efek animasi scroll
    });
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="min-h-screen h-full bg-slate-950">
      <div className="px-3 py-3 md:pt-7 md:pb-14 md:hidden block">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-transparent text-2xl bg-clip-text bg-gradient-to-r to-cyan-400 from-blue-500 md:pb-1">
            Mealshunter
          </h1>
          <div className="absolute right-[14px] md:hidden block">
            <FaBarsProgress
              onClick={handleSidebar}
              size={30}
              className={`${
                sidebar
                  ? "duration-300 text-gray-100 cursor-pointer hover:text-gray-600"
                  : "text-gray-600 cursor-pointer hover:text-gray-100 duration-300"
              }`}
            />
          </div>
        </div>
        <div className="border-b-2 border-gray-700 pt-4 md:pt-6 md:hidden block"></div>
      </div>
      <div className="relative w-full md:top-3 md:px-3 px-2 min-h-screen h-full pb-6">
        <div className="bg-blue-700 xl:h-[350px] md:h-[400px] h-[200px] rounded-md">
          <div className="md:pl-10 md:pt-5 px-2 pt-3">
            <span className="text-white text-sm tracking-widest md:text-xl md:font-semibold font-medium">
              REVIEW
            </span>
            <h1 className="md:text-6xl text-2xl text-white md:font-light md:text-center font-light sm:pt-20 pt-7">
              The most overated{" "}
              <span className="underline-offset-[10px] underline decoration-1">
                meals in the world.
              </span>
            </h1>
            <h1 className="text-white md:text-left text-right md:pt-24 pt-8 md:text-lg text-sm tracking-wider">
              <a
                href="https://www.themealdb.com"
                target="_blank"
                rel="noreferrer"
                className="italic font-normal tracking-wide hover:underline underline-offset-2"
              >
                Themealdb.com
              </a>{" "}
              Resource
            </h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row pt-3 space-y-3 md:space-y-0 md:space-x-3">
          <HoverImage
            imageSrc={hero1}
            text="Explore"
            link="/by-ingredients"
            header="Discover the Finest Ingredients for Delectable Meals"
          />
          <HoverImage
            imageSrc={hero2}
            text="Explore"
            link="/by-categories/:Dessert"
            header="Indulge Your Sweet Tooth with the Most Tempting Desserts!"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
