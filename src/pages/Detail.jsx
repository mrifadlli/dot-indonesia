// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

// Icon
import { FaBarsProgress } from "react-icons/fa6";

// axiosClients
import axiosClients from "../axiosClients";

// Router
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Detail = ({ handleSidebar, sidebar }) => {
  const [mealsDetail, setMealsDetail] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    scrollToTop();
    detailMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hit API
  const detailMeals = () => {
    axiosClients.get(`lookup.php?i=${id}`).then(({ data }) => {
      setMealsDetail(data.meals);
      // console.log(mealsDetail);
    });
  };

  // Fisrt render on top page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Efek animasi scroll
    });
  };

  return (
    <div className="bg-slate-950 min-h-screen h-full">
      <div className="px-8 py-8 md:pt-7 md:pb-14">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-transparent text-4xl bg-clip-text bg-gradient-to-r to-cyan-400 from-blue-500 pb-1">
            Meals Detail
          </h1>
          <div className="absolute right-[33px] md:hidden block">
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
        <div className="border-b-2 border-gray-700 pt-6"></div>
        <div className="pt-7">
          {mealsDetail.map((items) => (
            <div className="" key={items.idMeal}>
              <div className="flex flex-col xl:flex-row">
                <img
                  src={items.strMealThumb}
                  alt={items.strMeal}
                  className="object-cover xl:w-2/5 w-full h-full rounded-md"
                />
                <div className="flex flex-col xl:pt-0 pt-5 xl:px-8 space-y-3 justify-center">
                  <div className="">
                    <span className="font-medium text-transparent text-4xl bg-clip-text bg-gradient-to-r to-cyan-400 from-blue-500">
                      {items.strMeal}
                    </span>
                  </div>
                  <span className="text-white">How to make :</span>
                  <span className="text-white text-justify break-words">
                    {items.strInstructions}
                  </span>
                  <div className="flex text-white md:justify-end space-x-5 py-2">
                    <span className="break-words font-medium text-transparent text-xl bg-clip-text bg-gradient-to-r to-cyan-400 from-blue-500 border-b-2 py-1 border-gray-700">
                      {items.strArea}
                    </span>
                    <span className="break-words font-medium text-transparent text-xl bg-clip-text bg-gradient-to-r to-cyan-400 from-blue-500 border-b-2 py-1 border-gray-700">
                      {items.strCategory}
                    </span>
                    <span className="break-words font-medium text-transparent text-xl bg-clip-text bg-gradient-to-r to-cyan-400 from-blue-500 border-b-2 py-1 border-gray-700">
                      {items.strTags}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4 pt-4 md:pt-7 text-white">
                <p className="text-xl break-all">
                  Source :{" "}
                  <span className="text-lg text-blue-500 cursor-pointer hover:text-blue-700 duration-300">
                    {items.strSource}
                  </span>
                </p>
                <a
                  href={items.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl bg-blue-700 rounded-md px-8 py-2 w-fit hover:bg-blue-800 duration-300"
                >
                  See Tutorial
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
