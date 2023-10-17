/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Meals = ({ meals }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {meals.map((items) => (
        <div className="bg-slate-800 rounded-2xl" key={items.idMeal}>
          <Link to={`/detail/${items.idMeal}`}> 
            <img
              src={items.strMealThumb}
              alt={items.strMeal}
              className="w-full h-56 object-cover rounded-t-2xl cursor-pointer"
            />
          </Link>
          <div className="px-4 py-3">
            <p className="text-white text-lg pb-1 max-text1">{items.strMeal}</p>
            <p className="text-blue-50 max-text text-sm">
              {items.strInstructions}
            </p>
            <div className="flex gap-5 pt-5 pb-2">
              <Link to={`/detail/${items.idMeal}`}>
                <button className="bg-white/20 px-8 py-1.5 xl:px-8 xl:py-1.5 md:px-3 md:py-1 text-white rounded-md hover:bg-white/10 duration-300 cursor-pointer">
                  Detail
                </button>
              </Link>
              <a
                target="_blank"
                href={items.strYoutube}
                rel="noreferrer"
                className="cursor-pointer bg-blue-700 px-8 py-1.5 xl:px-8 xl:py-1.5 md:px-3 md:py-1 text-white rounded-md hover:bg-blue-800 duration-300"
              >
                Tutorial
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Meals;
