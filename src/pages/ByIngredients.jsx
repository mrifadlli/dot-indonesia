// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

// Icon
import { FaBarsProgress } from "react-icons/fa6";

// Component
import Ingredients from "../components/Ingredients";
import Pagination from "../components/Pagination";

// AxiosClient
import axiosClients from "../axiosClients";

// eslint-disable-next-line react/prop-types
const ByIngredients = ({ handleSidebar, sidebar }) => {
  // Values Ingredients
  const [keyword, setKeyword] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  // Values Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(48);

  // Fisrt render on top page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Efek animasi scroll
    });
  };

  // Hit API untuk pertama kali
  useEffect(() => {
    scrollToTop();
    // Hit API
    axiosClients.get(`list.php?i=list`).then(({ data }) => {
      setIngredients(data.meals);
      // console.log(ingredients);
    });
    // console.log(currentPage);
  }, [currentPage]);

  // Hit API kedua ketika terjadi perubahan data
  useEffect(() => {
    // Filter Ingredients
    const filterIngredients = ingredients.filter((ingredients) => {
      return ingredients.strIngredient
        .toLowerCase()
        .includes(keyword.toLocaleLowerCase());
    });

    // console.log(ingredients, keyword);
    setFilteredIngredients(filterIngredients);

    // console.log(keyword, ingredients);
  }, [keyword, ingredients]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIngredients = filteredIngredients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="min-h-screen h-full bg-slate-950 text-white">
      <div className="px-8 py-8 md:pt-8 md:pb-14">
        <div className="flex gap-x-4 items-center">
          <input
            className="bg-gray-800 px-8 py-2 w-64 md:w-[500px] xl:w-[600px] outline-none rounded-2xl text-white"
            type="text"
            placeholder="e.g Beef"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="bg-blue-800 hover:bg-blue-700 duration-500 px-9 py-2 rounded-xl text-blue-50 hidden md:block">
            Search
          </button>
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
          {currentIngredients.length > 0 ? (
            <Ingredients ingredients={currentIngredients} />
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
        {filteredIngredients.length > itemsPerPage && (
          <Pagination
            totalPages={Math.ceil(filteredIngredients.length / itemsPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ByIngredients;
