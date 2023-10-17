// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  const displayPages = 5; // Jumlah page number yang ingin ditampilkan

  // Hitung halaman yang akan ditampilkan
  let startPage = currentPage - Math.floor(displayPages / 2);
  if (startPage < 1) startPage = 1;

  // Hitung halaman terakhir
  let endPage = startPage + displayPages - 1;
  if (endPage > totalPages) endPage = totalPages;

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // console.log(totalPages, "totalPages");
  // console.log(startPage, "starPages");
  // console.log(endPage, "endPages");
  // console.log(pageNumbers, "pageNumbers");

  return (
    <div className="flex pt-11 justify-center items-center space-x-6">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-white bg-white/20 px-4 py-1 hover:bg-white/10 duration-300 cursor-pointer"
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={
            currentPage === number ? "active text-blue-500" : "text-white"
          }
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-white bg-blue-700 px-4 py-1 hover:bg-blue-800 duration-300 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
