/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

// Icon
import { FaBarsProgress } from "react-icons/fa6";
import { BiLeftArrowAlt } from "react-icons/bi";

// Components
import Meals from "../Components/Meals";
import Pagination from "../Components/Pagination";

// axiosClientd
import axiosClients from "../axiosClients";

// Route
import { Link, useParams } from "react-router-dom";

const MealsIngredients = ({ sidebar, handleSidebar }) => {
  // Value Meals By Ingredients
  const [Ingredients, setIngredients] = useState([]);

  // Route Params
  const { ingredient } = useParams();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Hit API
  const mealsByIngredient = () => {
    axiosClients.get(`filter.php?i=${ingredient.slice(1)}`).then(({ data }) => {
      setIngredients(data.meals);
      console.log(Ingredients);
    });
  };

  // Fisrt render on top page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Efek animasi scroll
    });
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Ingredients
    ? Ingredients.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Ingredients
    ? Math.ceil(Ingredients.length / itemsPerPage)
    : 0;

  useEffect(() => {
    // console.log(ingredient.slice(1));
    mealsByIngredient();
    scrollToTop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="min-h-screen h-full bg-slate-950">
      <div className="px-8 py-8 md:pt-7 md:pb-14">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-transparent text-4xl bg-clip-text bg-gradient-to-r to-cyan-400 from-blue-500 pb-1">
            Ingredients Page
          </h1>
          <div className="absolute right-[33px]">
            <div className="md:hidden block">
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
            <Link
              to={"/by-ingredients"}
              className="hidden md:block bg-blue-800 hover:bg-blue-700 duration-500 px-4 py-2 rounded-xl text-blue-50"
            >
              <button className="text-white flex items-center">
                {" "}
                <BiLeftArrowAlt size={23} /> Back to Ingredients
              </button>
            </Link>
          </div>
        </div>
        <div className="border-b-2 border-gray-700 pt-6"></div>
        <div className="pt-6">
          {!currentItems || !Ingredients ? (
            <div className="flex justify-center items-center">
              <p className="text-xl font-normal text-blue-50">
                No Data Found! or{" "}
                <span className="text-blue-600 underline cursor-pointer hover:text-blue-700 duration-200">
                  Search For Meals
                </span>
              </p>
            </div>
          ) : (
            <>
              <Meals meals={currentItems} />
              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealsIngredients;
