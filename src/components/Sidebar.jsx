// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icon
import { MdVerified } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import me from "../assets/me.jpg";

// Hit API
import axiosClients from "../axiosClients";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ sidebar, setSidebar }) => {
  const [categories, setCategories] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [navLoc, setNavLoc] = useState("");
  const naigate = useNavigate();

  useEffect(() => {
    axiosClients.get("categories.php").then(({ data }) => {
      setCategories(data.categories);
    });
  }, []);

  const handleClickDropdown = () => {
    setDropdown(!dropdown);
    setNavLoc("");
  };

  const handleNavLoc = (buttonName) => {
    setNavLoc(buttonName);
    setDropdown(false);
    setSidebar(false);
  };

  const handleClickHome = () => {
    naigate("/");
    setDropdown(false);
    setNavLoc("");
    setSidebar(false);
  };

  return (
    <div
      className={`h-full min-h-screen ${
        sidebar ? "fixed h-screen z-10" : "hidden"
      } md:block md:sticky md:top-0 md:left-0 p-4 space-y-2 w-96 bg-gray-900 text-gray-100`}
    >
      <div
        onClick={handleClickHome}
        className="flex items-center p-1 space-x-2"
      >
        <h1 className="font-medium text-transparent text-3xl bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer">
          Mealshunter
        </h1>
      </div>
      <div className="px-2 flex items-center space-x-3">
        <img src={me} alt="" className="w-16 h-16 rounded-full" />
        <div className="flex flex-col">
          <span className="text-base font-normal flex items-center gap-x-1.5">
            Muhamad Anrico
            <MdVerified className="cursor-pointer text-blue-500" size={17} />
          </span>
          <span className="text-sm font-thin">Developer</span>
        </div>
      </div>
      <div className="divide-y divide-gray-700">
        <div className="border-b-2 border-gray-700 pb-1"></div>
        <ul className="pt-4">
          <Link to={"/by-name/:name?"}>
            <li
              onClick={() => handleNavLoc("searchByName")}
              className={`mb-5 py-2 text-lg  pl-5 rounded-2xl cursor-pointer border-b-[1px] border-gray-700 ${
                navLoc === "searchByName" ? "bg-blue-800" : "hover:bg-gray-800"
              }`}
            >
              Seacrh By Name
            </li>
          </Link>
          <Link to={"/by-ingredients"}>
            <li
              onClick={() => handleNavLoc("searchByIngredients")}
              className={`mb-5 py-2 text-lg  pl-5 rounded-2xl cursor-pointer border-b-[1px] border-gray-700 ${
                navLoc === "searchByIngredients"
                  ? "bg-blue-800"
                  : "hover:bg-gray-800"
              }`}
            >
              Seacrh By Ingredients
            </li>
          </Link>
          <li
            className={`flex items-center gap-x-5 my-5 py-2 text-lg  pl-5 rounded-2xl cursor-pointer border-b-[1px] border-gray-700 ${
              dropdown ? "bg-blue-800" : "hover:bg-gray-800"
            }`}
            onClick={handleClickDropdown}
          >
            Seacrh By Category
            <span>
              <MdArrowBackIos
                className={`${
                  dropdown
                    ? "-rotate-90 duration-300"
                    : "duration-300 rotate-180"
                }`}
              />
            </span>
          </li>
          {dropdown && (
            <div
              data-aos={dropdown ? "fade-right" : "fade-right"}
              className={`grid grid-cols-2 gap-5 ml-6 overflow-y-auto`}
            >
              {categories.map((items) => (
                <ul className="w-fit" key={items.idCategory}>
                  <Link
                    to={`/by-categories/:${items.strCategory}`}
                    onClick={() => setSidebar(false)}
                  >
                    <li className="text-white px-3 py-1 bg-blue-900 cursor-pointer hover:scale-95 duration-500">
                      {items.strCategory}
                    </li>
                  </Link>
                </ul>
              ))}
            </div>
          )}
        </ul>
      </div>
      <div className="mb-4 absolute bottom-0 left-0 py-1 px-3">
        <span className="text-xs tracking-wide">
          Copyright© 2023 mrifadlli - Indonesia
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
