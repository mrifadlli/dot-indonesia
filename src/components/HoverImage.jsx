// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const HoverImage = ({ imageSrc, text, header, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageSrc} alt="Your Image" className="w-full rounded-md" />

      {isHovered && (
        <div className="absolute inset-0 flex items-end  justify-center bg-black bg-opacity-30 transition-opacity duration-700">
          <div className="bg-blue-700 w-full h-32 rounded-md">
            <p className="text-center text-white md:pt-7 pt-4 md:text-xl">
              {header}
            </p>
            <Link to={link}>
              <p className="text-white md:text-lg text-center pt-3 md:py-4 hover:underline">
                {text}
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverImage;
