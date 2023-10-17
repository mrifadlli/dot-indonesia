/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

// Components
import Meals from "../components/Meals";
import Pagination from "../components/Pagination";

// Icon
import { FaBarsProgress } from "react-icons/fa6";

// axiosClients
import axiosClients from "../axiosClients";

// Route
import { useParams } from "react-router-dom";

const SearchByCategories = ({ sidebar, handleSidebar }) => {
  // Category meals value
  const [mealsCategory, setMealsCategory] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Route Params
  const { category } = useParams();

  // Hit Api
  const mealsByCategory = () => {
    axiosClients.get(`filter.php?c=${category.slice(1)}`).then(({ data }) => {
      console.log(category);
      setMealsCategory(data.meals);
      console.log(mealsCategory);
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
  const currentItems = mealsCategory
    ? mealsCategory.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = mealsCategory
    ? Math.ceil(mealsCategory.length / itemsPerPage)
    : 0;

  useEffect(() => {
    mealsByCategory();
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, currentPage]);

  return (
    <div className="min-h-screen h-full bg-slate-950">
      <div className="px-8 py-8 md:pt-7 md:pb-14">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-transparent text-4xl bg-clip-text bg-gradient-to-r to-cyan-400 from-blue-500 pb-1">
            Categories Page
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
        <div className="pt-6">
          {mealsCategory ? (
            <>
              <Meals meals={currentItems} />
              {totalPages > 1 && (
                <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              )}
            </>
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-xl font-normal text-blue-50">
                No Data Found! or{" "}
                <span className="text-blue-600 underline cursor-pointer hover:text-blue-700 duration-200">
                  Search For Meals
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchByCategories;
