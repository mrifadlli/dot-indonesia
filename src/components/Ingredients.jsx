/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Ingredients = ({ ingredients }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {ingredients.map((items) => (
        <Link
          key={items.idIngredient}
          to={`/ingredient/:${items.strIngredient}`}
        >
          <div className="bg-gray-700 px-7 py-2.5 text-center rounded-md cursor-pointer hover:bg-blue-700 duration-300">
            <button className="text-lg">{items.strIngredient}</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Ingredients;
