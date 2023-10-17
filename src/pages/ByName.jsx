// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";

// Icon
import { FaBarsProgress } from "react-icons/fa6";

// Router
import { useParams, useNavigate } from "react-router-dom";

// AxiosClients
import axiosClients from "../axiosClients";

// Components
import Meals from "../Components/Meals";
import Pagination from "../Components/Pagination";

// eslint-disable-next-line react/prop-types
const ByName = ({ handleSidebar, sidebar }) => {
  // Route Params
  const { params } = useParams();
  const navigate = useNavigate();

  // Value Meals
  const [keyword, setKeyword] = useState(params || "Beef");
  const [meals, setMeals] = useState([]);
  const inputRef = useRef(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    scrollToTop();
    if (keyword) {
      searchMeals();
    } else {
      setMeals([]);
    }

    updateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, currentPage]);

  // Fisrt render on top page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Efek animasi scroll
    });
  };

  // Hit API
  const searchMeals = () => {
    axiosClients.get(`search.php?s=${keyword}`).then(({ data }) => {
      setMeals(data.meals);
    });
  };

  // Route Params
  const updateURL = () => {
    navigate(`/by-name/:${keyword}?`);
  };

  // Handle not found or seacrh for meals
  const handlePlaceholder = () => {
    inputRef.current.focus();
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = meals
    ? meals.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = meals ? Math.ceil(meals.length / itemsPerPage) : 0;

  return (
    <div className="min-h-screen h-full bg-slate-950">
      <div className="px-8 py-8 md:pt-8 md:pb-14">
        <div className="flex gap-x-4 items-center">
          <input
            className="bg-gray-800 px-8 py-2 w-64 md:w-[500px] xl:w-[600px] outline-none rounded-2xl text-white"
            type="text"
            placeholder="e.g Beef"
            ref={inputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onBlur={updateURL}
          />
          <button
            onClick={updateURL}
            className="bg-blue-800 hover:bg-blue-700 duration-500 px-9 py-2 rounded-xl text-blue-50 hidden md:block"
          >
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
          {!currentItems || !keyword || !totalPages ? ( // Menampilkan pesan jika meals bernilai null
            <div className="flex justify-center items-center">
              <p className="text-xl font-normal text-blue-50">
                No Data Found! or{" "}
                <span
                  className="text-blue-600 underline cursor-pointer hover:text-blue-700 duration-200"
                  onClick={handlePlaceholder}
                >
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

export default ByName;
