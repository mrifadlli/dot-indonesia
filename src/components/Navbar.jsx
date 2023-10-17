// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItem = [
    { id: 1, text: "Home", link: "/home" },
    { id: 2, text: "About", link: "/about" },
    { id: 3, text: "Explore", link: "/explore" },
  ];
  return (
    <nav className="bg-slate-950 w-full xl:px-20 px-3 py-6">
      <div className="flex justify-between">
        <div className="flex items-center">
          <h1 className="font-medium text-transparent text-xl md:text-3xl bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer">
            Mealshunter
          </h1>
          <ul className="list-none pl-24 space-x-7">
            {navItem.map((item) => (
              <a
                key={item.id}
                className="text-white text-xl hover:text-blue-600 cursor-pointer font-medium tracking-wide"
              >
                {item.text}
              </a>
            ))}
          </ul>
        </div>
        <div className="flex space-x-4">
          <Link to={"/login"}>
            <button className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-fit px-7 tracking-wide py-2 text-lg font-medium">
              Explore
            </button>
          </Link>
          <Link to={"/login"}>
            <button className="border-white border-2 text-white rounded-lg w-fit px-7 tracking-wide py-2 text-lg font-medium">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
